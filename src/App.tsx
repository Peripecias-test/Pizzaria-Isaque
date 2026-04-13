import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Pizza as PizzaIcon, 
  ChefHat, 
  Clock, 
  MapPin, 
  Phone, 
  Instagram, 
  Facebook, 
  Menu as MenuIcon, 
  Sparkles,
  ArrowRight,
  Utensils,
  Flame,
  BookOpen,
  History
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { MENU } from './types';
import { GoogleGenAI } from "@google/genai";
import { handleWhatsAppOrder } from './components/PizzaCard';
import MenuPage from './pages/MenuPage';

// Initialize Gemini
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

function HomePage() {
  const [aiRecommendation, setAiRecommendation] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");

  const getAiRecommendation = async () => {
    if (!aiPrompt) return;
    setIsAiLoading(true);
    try {
      const response = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Você é o Chef da Isaque Pizzeria. Com base no que o cliente disse: "${aiPrompt}", recomende uma das nossas pizzas do menu: ${MENU.map(p => p.name).join(', ')}. Explique o porquê de forma charmosa e italiana. Seja breve.`
      });
      setAiRecommendation(response.text || "Mamma mia! Recomendo nossa Margherita clássica!");
    } catch (error) {
      console.error("AI Error:", error);
      setAiRecommendation("Mamma mia! O Chef está um pouco ocupado agora, mas recomendo nossa Margherita clássica!");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center landscape:items-start overflow-hidden py-20 md:py-0 landscape:pt-32">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2000&auto=format&fit=crop" 
            alt="Pizza Hero" 
            className="w-full h-full object-cover brightness-50"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-white">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <Badge className="bg-amber-500/20 text-amber-200 border-amber-500/30 mb-4 px-4 py-1 text-sm backdrop-blur-sm">
              Tradizione Italiana dal 2018
            </Badge>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-8xl font-bold leading-tight mb-6">
              A Arte da Pizza <br />
              <span className="italic text-amber-400">Artesanal</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-stone-200 mb-8 max-w-lg leading-relaxed">
              Ingredientes importados da Itália, fermentação natural de 48h e o calor do forno a lenha. Sinta o verdadeiro sabor de Nápoles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/menu">
                <Button size="lg" className="bg-brand-red hover:bg-brand-red/90 text-white rounded-full px-8 h-14 text-lg w-full sm:w-auto">
                  Ver Cardápio Completo
                </Button>
              </Link>
              <a href="#about">
                <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 text-white rounded-full px-8 h-14 text-lg w-full sm:w-auto">
                  Nossa História
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
        
        {/* Floating Stats */}
        <div className="absolute bottom-8 left-0 right-0 lg:left-auto lg:right-12 flex flex-row justify-center lg:justify-end gap-6 sm:gap-8 px-4 z-20">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-400">48h</div>
            <div className="text-[10px] sm:text-xs uppercase tracking-widest text-stone-300">Fermentação</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-400">450°C</div>
            <div className="text-[10px] sm:text-xs uppercase tracking-widest text-stone-300">Forno a Lenha</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-400">100%</div>
            <div className="text-[10px] sm:text-xs uppercase tracking-widest text-stone-300">Artesanal</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 bg-brand-cream rounded-2xl flex items-center justify-center text-brand-red">
                <Utensils className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold">Ingredientes Premium</h3>
              <p className="text-stone-600">Farinha 00, tomates San Marzano e azeites selecionados diretamente de produtores italianos.</p>
            </div>
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 bg-brand-cream rounded-2xl flex items-center justify-center text-brand-red">
                <Flame className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold">Forno a Lenha</h3>
              <p className="text-stone-600">Nossas pizzas são assadas em forno de pedra vulcânica, garantindo a borda perfeita e aerada.</p>
            </div>
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 bg-brand-cream rounded-2xl flex items-center justify-center text-brand-red">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold">Tradição e Tempo</h3>
              <p className="text-stone-600">Respeitamos o tempo da massa. Longa fermentação para uma digestão leve e sabor incomparável.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Nossa História Section */}
      <section id="about" className="py-16 md:py-24 bg-brand-cream overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-brand-red p-3 rounded-2xl">
                  <History className="w-6 h-6 text-white" />
                </div>
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-red">Nossa História</h2>
              </div>
              <div className="space-y-6 text-stone-700 text-lg leading-relaxed">
                <p>
                  A jornada da <span className="font-bold text-brand-red italic">Isaque Pizzas e Esfihas</span> começou em 2018, com um sonho simples: trazer a verdadeira essência da pizza napolitana para Mauá.
                </p>
                <p>
                  Tudo começou em uma pequena cozinha familiar, onde Isaque, apaixonado pela gastronomia italiana, passou meses aperfeiçoando a receita da massa de longa fermentação. O segredo? Paciência, respeito aos ingredientes e muito amor pelo que se faz.
                </p>
                <p>
                  Hoje, somos referência em qualidade, utilizando apenas farinha 00 importada e tomates San Marzano colhidos aos pés do Vesúvio. Cada pizza que sai do nosso forno a lenha é uma homenagem à tradição, mas com o toque acolhedor que só a nossa comunidade possui.
                </p>
                <div className="pt-6">
                  <Link to="/menu">
                    <Button className="bg-brand-red hover:bg-brand-red/90 text-white rounded-full px-8 h-14 text-lg group">
                      Explorar Nosso Cardápio
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img 
                    src="https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?q=80&w=600&auto=format&fit=crop" 
                    alt="Massa artesanal" 
                    className="rounded-3xl shadow-lg w-full h-64 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?q=80&w=600&auto=format&fit=crop" 
                    alt="Ingredientes frescos" 
                    className="rounded-3xl shadow-lg w-full h-48 object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="pt-12 space-y-4">
                  <img 
                    src="https://offloadmedia.feverup.com/bostonuncovered.com/wp-content/uploads/2023/07/28061531/pastoral.jpg" 
                    alt="Forno a lenha" 
                    className="rounded-3xl shadow-lg w-full h-48 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=600&auto=format&fit=crop" 
                    alt="Pizza pronta" 
                    className="rounded-3xl shadow-lg w-full h-64 object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              {/* Decorative element */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-red/5 rounded-full blur-3xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Chef AI Section */}
      <section id="chef-ai" className="py-16 md:py-24 min-h-[500px] bg-brand-red text-white overflow-hidden relative flex items-center">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
          <ChefHat className="w-full h-full rotate-12" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-white p-3 rounded-2xl shadow-lg animate-pulse">
                  <Sparkles className="w-8 h-8 text-brand-red" />
                </div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold">Pergunte ao Chef AI</h2>
              </div>
              <p className="text-stone-300 text-base md:text-lg mb-8 leading-relaxed">
                Não sabe o que escolher? Diga ao nosso Chef virtual o que você está sentindo ou quais ingredientes você ama, e ele recomendará a pizza perfeita para o seu momento.
              </p>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="prompt" className="text-stone-300">O que você deseja hoje?</Label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input 
                      id="prompt"
                      placeholder="Ex: Estou com vontade de algo picante e com queijo..." 
                      className="bg-white/20 border-white/40 text-white placeholder:text-white/70 h-12 rounded-xl focus:bg-white/30 transition-all"
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                    />
                    <Button 
                      onClick={getAiRecommendation}
                      disabled={isAiLoading || !aiPrompt}
                      className="bg-[#fbff00] hover:bg-[#eaff00] text-brand-red font-extrabold h-12 px-8 rounded-xl w-full sm:w-auto shadow-xl hover:scale-105 transition-all"
                    >
                      {isAiLoading ? "Pensando..." : "Recomendar"}
                    </Button>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {aiRecommendation && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-white/5 border border-white/10 p-6 rounded-2xl mt-6 relative"
                    >
                      <div className="absolute -top-3 left-6 bg-amber-500 text-brand-red text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        Chef Recomenda
                      </div>
                      <p className="text-lg italic leading-relaxed text-stone-100">
                        "{aiRecommendation}"
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            <div className="relative mt-8 lg:mt-0">
              <div className="aspect-video md:aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop" 
                  alt="Chef working" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl text-brand-red hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="bg-brand-red/10 p-3 rounded-full">
                    <Utensils className="w-6 h-6 text-brand-red" />
                  </div>
                  <div>
                    <div className="font-bold text-xl">Massa Madre</div>
                    <div className="text-sm text-stone-500">Fermentação Natural</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-brand-cream font-sans text-stone-900">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled || location.pathname !== '/' ? 'bg-brand-red/95 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4 md:py-6'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className={`flex items-center justify-center w-auto transition-all duration-500 ${isScrolled ? 'h-20 md:h-28' : 'h-28 sm:h-32 md:h-56'} landscape:h-16 landscape:sm:h-20`}>
              <img 
                src="https://lh3.googleusercontent.com/d/1HWL4GeVg-yiSLei76Npr0zZG7mlGtW2d"
                alt="Logo" 
                className="h-full w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-serif text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-white"></span>
          </Link>

          {/* Desktop Nav */}
          <div className={`hidden md:flex items-center gap-8 font-medium ${isScrolled || location.pathname !== '/' ? 'text-white' : 'text-white'}`}>
            <Link to="/menu" className="hover:text-yellow-400 transition-colors flex items-center gap-1">
              <BookOpen className="w-4 h-4" /> Cardápio
            </Link>
            <a href="/#about" className="hover:text-yellow-400 transition-colors">Nossa História</a>
            <a href="/#chef-ai" className="hover:text-brand-red transition-colors flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-amber-500" /> Chef AI
            </a>
            <Button 
              onClick={() => handleWhatsAppOrder()}
              className={`${isScrolled || location.pathname !== '/' ? 'bg-yellow-400 text-brand-red hover:bg-yellow-500' : 'bg-brand-red text-white hover:bg-brand-red/90'} rounded-full px-6 transition-all`}
            >
              Pedir Agora
            </Button>
          </div>

          {/* Mobile Nav */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <MenuIcon className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-brand-cream overflow-y-auto">
                <div className="flex flex-col gap-6 mt-12 text-lg font-medium pb-8">
                  <Link to="/menu">Cardápio</Link>
                  <a href="/#about">Nossa História</a>
                  <a href="/#chef-ai">Chef AI</a>
                  <Button 
                    onClick={() => handleWhatsAppOrder()}
                    className="bg-brand-red text-white w-full"
                  >
                    Pedir Agora
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
      </Routes>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center justify-center h-20 md:h-32 w-auto">
                  <img 
                    src="https://lh3.googleusercontent.com/d/1pIZwqUb-izcFU5F9_AWdffg6nWHh1NgU" 
                    alt="Logo" 
                    className="h-full w-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-white">Isaque Pizzas e Esfihas</span>
              </div>
              <p className="mb-6 leading-relaxed">
                Trazendo a tradição napolitana para o coração da cidade. Pizzas feitas com alma e paixão.
              </p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-brand-red transition-colors"><Instagram className="w-6 h-6" /></a>
                <a href="#" className="hover:text-brand-red transition-colors"><Facebook className="w-6 h-6" /></a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Links Rápidos</h4>
              <ul className="space-y-4">
                <li><Link to="/menu" className="hover:text-white transition-colors">Cardápio</Link></li>
                <li><a href="/#about" className="hover:text-white transition-colors">Nossa História</a></li>
                <li><a href="/#chef-ai" className="hover:text-white transition-colors">Chef AI</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Reservas</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Contato</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-red shrink-0" />
                  <span>Rua Paulo Loro, 55 - Jd Zaíra - Mauá<br />São Paulo, SP</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-brand-red shrink-0" />
                  <span>(11) 95434-1571</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-brand-red shrink-0" />
                  <span>Qua - Dom: 18:00 - 23:30</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Newsletter</h4>
              <p className="mb-4">Receba novidades e promoções exclusivas.</p>
              <div className="flex gap-2">
                <Input className="bg-stone-800 border-stone-700 text-white" placeholder="Seu e-mail" />
                <Button className="bg-brand-red hover:bg-brand-red/90 text-white">Ok</Button>
              </div>
            </div>
          </div>
          
          <Separator className="bg-stone-800 mb-8" />
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>© 2026 Isaque Pizzas e Esfihas. Todos os direitos reservados.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacidade</a>
              <a href="#" className="hover:text-white transition-colors">Termos</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
