import itemImage1 from '../assets/item-image-1.jpg'
import itemImage2 from '../assets/item-image-2.jpg'
import itemImage3 from '../assets/item-image-3.jpg'

export const categoryOptions = [
  { value: '', label: 'Todas as categorias' },
  { value: 'livros', label: 'Livros' },
  { value: 'cadernos', label: 'Cadernos' },
  { value: 'mochilas', label: 'Mochilas' },
  { value: 'material-escrita', label: 'Material de escrita' },
  { value: 'artes', label: 'Artes' },
]

export const conditionOptions = [
  { value: '', label: 'Todos os estados' },
  { value: 'novo', label: 'Novo' },
  { value: 'seminovo', label: 'Seminovo' },
  { value: 'usado', label: 'Usado' },
]

const catalogItems = [
  {
    id: 1,
    image: itemImage1,
    alt: 'Kit de Lápis de Cor 48 unidades',
    category: 'artes',
    categoryLabel: 'Artes',
    condition: 'usado',
    conditionLabel: 'Usado',
    title: 'Kit de Lápis de Cor 48un.',
    location: 'Fortaleza, CE',
    donor: 'M. Oliveira',
  },
  {
    id: 2,
    image: itemImage2,
    alt: 'Mochila Escolar Reforçada',
    category: 'mochilas',
    categoryLabel: 'Mochilas',
    condition: 'seminovo',
    conditionLabel: 'Seminovo',
    title: 'Mochila Escolar Reforçada',
    location: 'Caucaia, CE',
    donor: 'R. Bezerra',
  },
  {
    id: 3,
    image: itemImage3,
    alt: 'Coleção de Livros Didáticos',
    category: 'livros',
    categoryLabel: 'Livros',
    condition: 'novo',
    conditionLabel: 'Novo',
    title: 'Coleção de Livros Didáticos',
    location: 'Fortaleza, CE',
    donor: 'S. Ferreira',
  },
]

export default catalogItems
