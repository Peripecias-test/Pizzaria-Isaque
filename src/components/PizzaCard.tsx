import { motion } from 'motion/react';
import { ArrowRight, Leaf, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Pizza } from '../types';

const WHATSAPP_NUMBER = "5511954341571";

export const handleWhatsAppOrder = (pizzaName?: string, pizzaDescription?: string) => {
  let message = "Olá, tudo bem? Gostaria de fazer um pedido!";
  if (pizzaName && pizzaDescription) {
    message = `Olá, tudo bem? Eu pretendo comprar uma pizza ${pizzaName}, de ${pizzaDescription}.`;
  }
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
};

interface PizzaCardProps {
  pizza: Pizza;
  index: number;
}

export function PizzaCard({ pizza, index }: PizzaCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all group bg-white rounded-3xl h-full flex flex-col">
        <div className="relative h-64 overflow-hidden">
          <img 
            src={pizza.image} 
            alt={pizza.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            {pizza.isVegetarian && (
              <Badge className="bg-green-500/90 text-white border-none backdrop-blur-md">
                <Leaf className="w-3 h-3 mr-1" /> Veggie
              </Badge>
            )}
            {pizza.isSpicy && (
              <Badge className="bg-red-500/90 text-white border-none backdrop-blur-md">
                <Flame className="w-3 h-3 mr-1" /> Picante
              </Badge>
            )}
          </div>
        </div>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="font-serif text-2xl group-hover:text-brand-red transition-colors">{pizza.name}</CardTitle>
            <span className="font-serif text-xl font-bold text-brand-red whitespace-nowrap ml-2">R$ {pizza.price}</span>
          </div>
          <CardDescription className="text-stone-500 line-clamp-2 mt-2">
            {pizza.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex flex-wrap gap-2">
            {pizza.ingredients.map(ing => (
              <span key={ing} className="text-[10px] uppercase tracking-widest font-bold text-stone-400 bg-stone-100 px-2 py-1 rounded">
                {ing}
              </span>
            ))}
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <Button 
            onClick={() => handleWhatsAppOrder(pizza.name, pizza.description)}
            className="w-full bg-stone-100 hover:bg-brand-red hover:text-white text-stone-900 border-none rounded-xl transition-all group/btn"
          >
            Pedir Agora
            <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover/btn:opacity-100 transition-all -translate-x-2 group-hover/btn:translate-x-0" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
