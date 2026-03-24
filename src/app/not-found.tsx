import { Home, ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center px-4">
        <div className="relative inline-block mb-8">
          <span className="text-[150px] md:text-[200px] font-heading font-bold text-gray-100 leading-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <Home size={64} className="text-primary opacity-60" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-4">
          Page Non Trouvée
        </h1>
        <p className="text-gray-500 text-lg max-w-md mx-auto mb-8">
          Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/" variant="primary" size="lg" icon={<Home size={20} />}>
            Retour à l&apos;Accueil
          </Button>
          <Button href="/contact" variant="outline" size="lg" icon={<ArrowLeft size={20} />}>
            Contactez-nous
          </Button>
        </div>
      </div>
    </section>
  );
}
