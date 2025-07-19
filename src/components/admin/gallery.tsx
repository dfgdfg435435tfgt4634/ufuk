import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Image, 
  Upload, 
  Trash2,
  Edit,
  Eye,
  Filter,
  Search,
  Grid,
  List
} from 'lucide-react'
import { Button } from '../ui/button'

interface GalleryImage {
  id: number
  src: string
  alt: string
  category: string
  uploadDate: string
  size: string
  views: number
}

const mockImages: GalleryImage[] = [
  {
    id: 1,
    src: "https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Klasik saç kesimi",
    category: "saç-kesimi",
    uploadDate: "2024-01-10",
    size: "1.2 MB",
    views: 245
  },
  {
    id: 2,
    src: "https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Sakal tıraşı",
    category: "sakal",
    uploadDate: "2024-01-09",
    size: "980 KB",
    views: 189
  },
  {
    id: 3,
    src: "https://images.pexels.com/photos/1805600/pexels-photo-1805600.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Fade kesim",
    category: "saç-kesimi",
    uploadDate: "2024-01-08",
    size: "1.5 MB",
    views: 312
  },
  {
    id: 4,
    src: "https://images.pexels.com/photos/1570806/pexels-photo-1570806.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Komple bakım",
    category: "bakım",
    uploadDate: "2024-01-07",
    size: "1.1 MB",
    views: 156
  },
  {
    id: 5,
    src: "https://images.pexels.com/photos/1570808/pexels-photo-1570808.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Saç yıkama",
    category: "bakım",
    uploadDate: "2024-01-06",
    size: "890 KB",
    views: 98
  },
  {
    id: 6,
    src: "https://images.pexels.com/photos/1570809/pexels-photo-1570809.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Kaş düzeltme",
    category: "bakım",
    uploadDate: "2024-01-05",
    size: "750 KB",
    views: 67
  }
]

const categories = [
  { id: 'all', label: 'Tümü' },
  { id: 'saç-kesimi', label: 'Saç Kesimi' },
  { id: 'sakal', label: 'Sakal' },
  { id: 'bakım', label: 'Bakım' }
]

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>(mockImages)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  const filteredImages = images.filter(image => {
    const matchesSearch = image.alt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || image.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const deleteImage = (id: number) => {
    setImages(prev => prev.filter(img => img.id !== id))
  }

  const getCategoryLabel = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)?.label || categoryId
  }

  const totalViews = images.reduce((sum, img) => sum + img.views, 0)
  const totalSize = images.reduce((sum, img) => {
    const size = parseFloat(img.size.replace(/[^\d.]/g, ''))
    return sum + (img.size.includes('MB') ? size : size / 1000)
  }, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Galeri Yönetimi</h1>
          <p className="text-gray-600">Salon fotoğraflarını görüntüleyin ve yönetin</p>
        </div>
        <Button>
          <Upload className="w-4 h-4 mr-2" />
          Fotoğraf Yükle
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { 
            label: 'Toplam Fotoğraf', 
            value: images.length, 
            color: 'bg-blue-500',
            icon: Image
          },
          { 
            label: 'Toplam Görüntüleme', 
            value: totalViews.toLocaleString(), 
            color: 'bg-green-500',
            icon: Eye
          },
          { 
            label: 'Toplam Boyut', 
            value: `${totalSize.toFixed(1)} MB`, 
            color: 'bg-purple-500',
            icon: Upload
          },
          { 
            label: 'En Popüler', 
            value: images.reduce((max, img) => img.views > max.views ? img : max, images[0])?.alt.split(' ')[0] || '-', 
            color: 'bg-orange-500',
            icon: Filter
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
          >
            <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            <p className="text-gray-600 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Fotoğraf ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setCategoryFilter(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  categoryFilter === category.id
                    ? 'bg-primary text-black'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary text-black' : 'bg-gray-100 text-gray-700'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary text-black' : 'bg-gray-100 text-gray-700'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Gallery */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative group">
                <img 
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-48 object-cover cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setSelectedImage(image)}
                      className="p-2 bg-white rounded-full text-gray-700 hover:text-primary"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-white rounded-full text-gray-700 hover:text-primary">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => deleteImage(image.id)}
                      className="p-2 bg-white rounded-full text-gray-700 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-2">{image.alt}</h3>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span className="bg-gray-100 px-2 py-1 rounded">
                    {getCategoryLabel(image.category)}
                  </span>
                  <span>{image.views} görüntüleme</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                  <span>{image.size}</span>
                  <span>{new Date(image.uploadDate).toLocaleDateString('tr-TR')}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fotoğraf
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kategori
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Boyut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Görüntüleme
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tarih
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredImages.map((image) => (
                  <tr key={image.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img 
                          src={image.src}
                          alt={image.alt}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{image.alt}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                        {getCategoryLabel(image.category)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {image.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {image.views}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(image.uploadDate).toLocaleDateString('tr-TR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => setSelectedImage(image)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => deleteImage(image.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filteredImages.length === 0 && (
        <div className="text-center py-12">
          <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Fotoğraf bulunamadı</h3>
          <p className="text-gray-500">Arama kriterlerinize uygun fotoğraf bulunmuyor.</p>
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <img 
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              <Trash2 className="w-6 h-6" />
            </button>
            <div className="absolute bottom-4 left-4 right-4 bg-black/50 text-white p-4 rounded-lg">
              <h3 className="text-lg font-semibold">{selectedImage.alt}</h3>
              <div className="flex items-center justify-between text-sm opacity-80 mt-2">
                <span>{getCategoryLabel(selectedImage.category)}</span>
                <span>{selectedImage.views} görüntüleme</span>
                <span>{selectedImage.size}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}