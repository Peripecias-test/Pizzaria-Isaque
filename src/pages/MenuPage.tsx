import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Filter, 
  X, 
  ArrowLeft,
  Pizza as PizzaIcon,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MENU } from '../types';
import { PizzaCard } from '../components/PizzaCard';

export default function MenuPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Extract all unique ingredients from the menu
  const allIngredients = useMemo(() => {
    const ingredients = new Set<string>();
    MENU.forEach(pizza => {
      pizza.ingredients.forEach(ing => ingredients.add(ing));
    });
    return Array.from(ingredients).sort();
  }, []);

  const categories = ["All", "Classic", "Gourmet", "Special"];

  const filteredMenu = useMemo(() => {
    return MENU.filter(pizza => {
      const matchesSearch = pizza.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           pizza.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === "All" || pizza.category === selectedCategory;
      
      const matchesIngredients = selectedIngredients.length === 0 || 
                                 selectedIngredients.every(ing => pizza.ingredients.includes(ing));
      
      return matchesSearch && matchesCategory && matchesIngredients;
    });
  }, [searchQuery, selectedCategory, selectedIngredients]);

  const toggleIngredient = (ing: string) => {
    setSelectedIngredients(prev => 
      prev.includes(ing) ? prev.filter(i => i !== ing) : [...prev, ing]
    );
  };

  return (
    <div className="min-h-screen bg-brand-cream font-sans text-stone-900 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-brand-red hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Voltar</span>
          </Link>
          <div className="flex items-center gap-2">
            <PizzaIcon className="text-brand-red w-6 h-6" />
            <span className="font-serif text-xl font-bold text-brand-red">Cardápio Completo</span>
          </div>
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>
      </header>

      <main className="container mx-auto px-4 pt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 shrink-0 space-y-8">
            <div>
              <h3 className="font-serif text-xl font-bold mb-4 flex items-center gap-2">
                <Search className="w-5 h-5 text-brand-red" /> Buscar
              </h3>
              <Input 
                placeholder="Nome ou ingrediente..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white border-stone-200 rounded-xl"
              />
            </div>

            <div>
              <h3 className="font-serif text-xl font-bold mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5 text-brand-red" /> Categorias
              </h3>
              <div className="flex flex-wrap lg:flex-col gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all text-left ${
                      selectedCategory === cat 
                        ? 'bg-brand-red text-white shadow-md' 
                        : 'bg-white text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    {cat === "All" ? "Todas" : cat === "Classic" ? "Clássicas" : cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-serif text-xl font-bold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" /> Ingredientes
              </h3>
              <div className="flex flex-wrap gap-2">
                {allIngredients.map(ing => (
                  <button
                    key={ing}
                    onClick={() => toggleIngredient(ing)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${
                      selectedIngredients.includes(ing)
                        ? 'bg-amber-500 border-amber-500 text-brand-olive shadow-sm'
                        : 'bg-white border-stone-200 text-stone-400 hover:border-amber-500 hover:text-amber-600'
                    }`}
                  >
                    {ing}
                  </button>
                ))}
              </div>
              {selectedIngredients.length > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedIngredients([])}
                  className="mt-4 text-stone-400 hover:text-brand-red h-8 px-2"
                >
                  <X className="w-4 h-4 mr-1" /> Limpar filtros
                </Button>
              )}
            </div>
          </aside>

          {/* Menu Grid */}
          <div className="flex-grow">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-3xl font-bold">
                {selectedCategory === "All" ? "Nossas Pizzas" : selectedCategory}
                <span className="text-stone-400 text-lg font-sans ml-3 font-normal">
                  ({filteredMenu.length})
                </span>
              </h2>
            </div>

            <AnimatePresence mode="popLayout">
              {filteredMenu.length > 0 ? (
                <motion.div 
                  layout
                  className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  {filteredMenu.map((pizza, idx) => (
                    <div key={pizza.id}>
                      <PizzaCard pizza={pizza} index={idx} />
                    </div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-stone-200"
                >
                  <PizzaIcon className="w-16 h-16 text-stone-200 mx-auto mb-4" />
                  <p className="text-stone-500 text-lg">Nenhuma pizza encontrada com esses filtros.</p>
                  <Button 
                    variant="link" 
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("All");
                      setSelectedIngredients([]);
                    }}
                    className="text-brand-red"
                  >
                    Limpar todos os filtros
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
