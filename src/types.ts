export interface Pizza {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Classic' | 'Gourmet' | 'Special';
  image: string;
  ingredients: string[];
  isVegetarian?: boolean;
  isSpicy?: boolean;
}

export const MENU: Pizza[] = [
  {
    id: '1',
    name: 'Margherita Autêntica',
    description: 'Molho de tomate San Marzano, mozzarella di bufala, manjericão fresco e azeite extra virgem.',
    price: 48,
    category: 'Classic',
    image: 'https://static.vecteezy.com/ti/fotos-gratis/p2/20222733-italiano-pizza-margherita-com-tomate-molho-mozzarella-queijo-manjericao-em-uma-sombrio-concreto-fundo-pizza-receita-e-cardapio-gratis-foto.jpg',
    ingredients: ['Tomate San Marzano', 'Mozzarella di Bufala', 'Manjericão', 'Azeite'],
    isVegetarian: true,
  },
  {
    id: '2',
    name: 'Diavola Picante',
    description: 'Molho de tomate, mozzarella, salame picante italiano, cebola roxa e pimenta calabresa.',
    price: 54,
    category: 'Classic',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=800&auto=format&fit=crop',
    ingredients: ['Tomate', 'Mozzarella', 'Salame Picante', 'Cebola Roxa', 'Pimenta'],
    isSpicy: true,
  },
  {
    id: '3',
    name: 'Trufa & Cogumelos',
    description: 'Creme de trufas negras, mozzarella, mix de cogumelos frescos e queijo pecorino.',
    price: 68,
    category: 'Gourmet',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop',
    ingredients: ['Creme de Trufas', 'Mozzarella', 'Cogumelos', 'Pecorino'],
    isVegetarian: true,
  },
  {
    id: '4',
    name: 'Burrata & Pesto',
    description: 'Pesto de manjericão artesanal, tomate cereja confitado, burrata fresca e pinoli.',
    price: 72,
    category: 'Gourmet',
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=800&auto=format&fit=crop',
    ingredients: ['Pesto', 'Burrata', 'Tomate Cereja', 'Pinoli'],
    isVegetarian: true,
  },
  {
    id: '5',
    name: 'Prosciutto e Rúcula',
    description: 'Mozzarella, presunto de Parma, rúcula fresca, lascas de parmesão e redução de balsâmico.',
    price: 62,
    category: 'Special',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=800&auto=format&fit=crop',
    ingredients: ['Mozzarella', 'Presunto de Parma', 'Rúcula', 'Parmesão', 'Balsâmico'],
  },
  {
    id: '6',
    name: 'Quattro Formaggi',
    description: 'Uma seleção premium de Mozzarella, Gorgonzola, Parmesão e Taleggio.',
    price: 58,
    category: 'Classic',
    image: 'https://www.italianstylecooking.net/wp-content/uploads/2020/04/Pizza-quattro-formaggi-neu.jpg',
    ingredients: ['Mozzarella', 'Gorgonzola', 'Parmesão', 'Taleggio'],
    isVegetarian: true,
  }
];
