<?php
/**
 * Plugin Name: JJM Revalidate — L.L COUVERTURE
 * Description: Automatically revalidates the Next.js frontend when WordPress content changes (posts, pages, services, realisations).
 * Version: 1.0.0
 * Author: JJM Dev
 */

if (!defined('ABSPATH')) {
    exit;
}

class JJM_Revalidate {

    /**
     * The frontend revalidation endpoint.
     */
    private $revalidate_url;

    /**
     * The shared secret for authentication.
     */
    private $secret;

    public function __construct() {
        $this->revalidate_url = defined('JJM_REVALIDATE_URL')
            ? JJM_REVALIDATE_URL
            : 'https://llcouverture.com/api/revalidate';

        $this->secret = defined('JJM_REVALIDATE_SECRET')
            ? JJM_REVALIDATE_SECRET
            : 'jjm-revalidate-secret-key-2024-xyz';

        // Revalidate on post/page/CPT save, update, or delete
        add_action('save_post', [$this, 'on_content_change'], 10, 2);
        add_action('delete_post', [$this, 'on_content_delete'], 10, 1);
        add_action('wp_update_nav_menu', [$this, 'on_menu_change']);
        add_action('updated_option', [$this, 'on_option_change'], 10, 1);

        // Admin settings page
        add_action('admin_menu', [$this, 'add_settings_page']);
        add_action('admin_init', [$this, 'register_settings']);
    }

    /**
     * Triggered when a post/page/CPT is saved or updated.
     */
    public function on_content_change($post_id, $post) {
        // Skip autosaves and revisions
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
        if (wp_is_post_revision($post_id)) return;

        // Only revalidate for published content
        if ($post->post_status !== 'publish') return;

        // Determine which paths to revalidate based on post type
        $paths = $this->get_paths_for_post($post);
        $this->trigger_revalidation($paths);
    }

    /**
     * Triggered when a post is deleted.
     */
    public function on_content_delete($post_id) {
        $post = get_post($post_id);
        if (!$post) return;

        $paths = $this->get_paths_for_post($post);
        $this->trigger_revalidation($paths);
    }

    /**
     * Triggered when a navigation menu is updated.
     */
    public function on_menu_change() {
        $this->trigger_revalidation(['/']);
    }

    /**
     * Triggered on certain option changes (e.g., site title, tagline).
     */
    public function on_option_change($option) {
        $watched_options = ['blogname', 'blogdescription', 'site_icon'];
        if (in_array($option, $watched_options, true)) {
            $this->trigger_revalidation(['/']);
        }
    }

    /**
     * Determine which frontend paths to revalidate based on the post type and slug.
     */
    private function get_paths_for_post($post) {
        $paths = ['/'];

        switch ($post->post_type) {
            case 'service':
                $paths[] = '/services';
                $paths[] = '/services/' . $post->post_name;
                break;
            case 'realisation':
                $paths[] = '/realisations';
                break;
            case 'page':
                $slug = $post->post_name;
                if ($slug) {
                    $paths[] = '/' . $slug;
                }
                break;
            case 'post':
                $paths[] = '/';
                break;
        }

        return array_unique($paths);
    }

    /**
     * Send revalidation request to the Next.js frontend.
     */
    private function trigger_revalidation($paths = []) {
        $url = get_option('jjm_revalidate_url', $this->revalidate_url);
        $secret = get_option('jjm_revalidate_secret', $this->secret);

        $response = wp_remote_post($url, [
            'headers' => ['Content-Type' => 'application/json'],
            'body'    => wp_json_encode([
                'secret' => $secret,
                'paths'  => $paths,
            ]),
            'timeout' => 10,
        ]);

        if (is_wp_error($response)) {
            error_log('[JJM Revalidate] Error: ' . $response->get_error_message());
        } else {
            $code = wp_remote_retrieve_response_code($response);
            if ($code !== 200) {
                error_log('[JJM Revalidate] Failed with HTTP ' . $code);
            }
        }
    }

    /**
     * Add settings page under Settings menu.
     */
    public function add_settings_page() {
        add_options_page(
            'JJM Revalidate',
            'JJM Revalidate',
            'manage_options',
            'jjm-revalidate',
            [$this, 'render_settings_page']
        );
    }

    /**
     * Register settings.
     */
    public function register_settings() {
        register_setting('jjm_revalidate_settings', 'jjm_revalidate_url');
        register_setting('jjm_revalidate_settings', 'jjm_revalidate_secret');
    }

    /**
     * Render the settings page.
     */
    public function render_settings_page() {
        $url = get_option('jjm_revalidate_url', $this->revalidate_url);
        $secret = get_option('jjm_revalidate_secret', $this->secret);
        ?>
        <div class="wrap">
            <h1>JJM Revalidate Settings</h1>
            <form method="post" action="options.php">
                <?php settings_fields('jjm_revalidate_settings'); ?>
                <table class="form-table">
                    <tr>
                        <th scope="row">Revalidation URL</th>
                        <td>
                            <input type="url" name="jjm_revalidate_url" value="<?php echo esc_attr($url); ?>" class="regular-text" />
                            <p class="description">Your Next.js revalidation endpoint (e.g., https://llcouverture.com/api/revalidate)</p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Secret Key</th>
                        <td>
                            <input type="text" name="jjm_revalidate_secret" value="<?php echo esc_attr($secret); ?>" class="regular-text" />
                            <p class="description">Must match WORDPRESS_REVALIDATE_SECRET in your Next.js .env</p>
                        </td>
                    </tr>
                </table>
                <?php submit_button(); ?>
            </form>
            <hr />
            <h2>Test Revalidation</h2>
            <p>
                <button type="button" class="button button-secondary" id="jjm-test-revalidate">
                    Test Revalidation Now
                </button>
                <span id="jjm-test-result" style="margin-left: 10px;"></span>
            </p>
            <script>
                document.getElementById('jjm-test-revalidate').addEventListener('click', function() {
                    var result = document.getElementById('jjm-test-result');
                    result.textContent = 'Sending...';
                    fetch('<?php echo esc_url(admin_url('admin-ajax.php')); ?>', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        body: 'action=jjm_test_revalidate&_wpnonce=<?php echo wp_create_nonce('jjm_test_revalidate'); ?>'
                    })
                    .then(r => r.json())
                    .then(data => { result.textContent = data.success ? 'Success!' : 'Failed: ' + data.data; })
                    .catch(e => { result.textContent = 'Error: ' + e.message; });
                });
            </script>
        </div>
        <?php
    }
}

// AJAX handler for test button
add_action('wp_ajax_jjm_test_revalidate', function() {
    check_ajax_referer('jjm_test_revalidate');
    if (!current_user_can('manage_options')) {
        wp_send_json_error('Unauthorized');
    }

    $instance = new JJM_Revalidate();
    // Use reflection to call private method for testing
    $url = get_option('jjm_revalidate_url', defined('JJM_REVALIDATE_URL') ? JJM_REVALIDATE_URL : 'https://llcouverture.com/api/revalidate');
    $secret = get_option('jjm_revalidate_secret', defined('JJM_REVALIDATE_SECRET') ? JJM_REVALIDATE_SECRET : 'jjm-revalidate-secret-key-2024-xyz');

    $response = wp_remote_post($url, [
        'headers' => ['Content-Type' => 'application/json'],
        'body'    => wp_json_encode([
            'secret' => $secret,
            'paths'  => ['/'],
        ]),
        'timeout' => 10,
    ]);

    if (is_wp_error($response)) {
        wp_send_json_error($response->get_error_message());
    }

    $code = wp_remote_retrieve_response_code($response);
    if ($code === 200) {
        wp_send_json_success('Revalidation triggered successfully');
    } else {
        wp_send_json_error('HTTP ' . $code . ': ' . wp_remote_retrieve_body($response));
    }
});

new JJM_Revalidate();
