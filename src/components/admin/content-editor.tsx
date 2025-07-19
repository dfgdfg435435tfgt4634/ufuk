import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Edit, 
  Save, 
  X, 
  Eye, 
  Type, 
  Image as ImageIcon,
  Plus,
  Trash2,
  Upload,
  Check,
  AlertCircle
} from 'lucide-react'
import { Button } from '../ui/button'
import { useRealTimeSync } from '../../hooks/useRealTimeSync'
import { apiClient } from '../../lib/api'

interface ContentItem {
  id: string
  section: string
  key: string
  title?: string
  content: string
  type: 'text' | 'html' | 'image'
  created_at: string
  updated_at?: string
}

interface Image {
  id: string
  filename: string
  original_name: string
  url: string
  size: number
  created_at: string
}

export default function ContentEditor() {
  const [content, setContent] = useState<ContentItem[]>([])
  const [images, setImages] = useState<Image[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingContent, setEditingContent] = useState('')
  const [editingTitle, setEditingTitle] = useState('')
  const [selectedSection, setSelectedSection] = useState('all')
  const [showImageManager, setShowImageManager] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)

  const { connectionStatus, subscribe } = useRealTimeSync(true)

  useEffect(() => {
    loadContent()
    loadImages()
  }, [])

  useEffect(() => {
    // Subscribe to real-time content updates
    const unsubscribeContentUpdated = subscribe('content-updated', (updatedContent: ContentItem) => {
      setContent(prev => 
        prev.map(item => item.id === updatedContent.id ? updatedContent : item)
      )
      showNotification('İçerik güncellendi', 'info')
    })

    const unsubscribeContentCreated = subscribe('content-created', (newContent: ContentItem) => {
      setContent(prev => [...prev, newContent])
      showNotification('Yeni içerik eklendi', 'success')
    })

    const unsubscribeImageUploaded = subscribe('image-uploaded', (newImage: Image) => {
      setImages(prev => [newImage, ...prev])
      showNotification('Yeni resim yüklendi', 'success')
    })

    const unsubscribeImageDeleted = subscribe('image-deleted', ({ id }: { id: string }) => {
      setImages(prev => prev.filter(img => img.id !== id))
      showNotification('Resim silindi', 'warning')
    })

    return () => {
      unsubscribeContentUpdated()
      unsubscribeContentCreated()
      unsubscribeImageUploaded()
      unsubscribeImageDeleted()
    }
  }, [subscribe])

  const loadContent = async () => {
    try {
      const data = await apiClient.getContent()
      setContent(data)
    } catch (error) {
      console.error('Error loading content:', error)
      showNotification('İçerik yüklenirken hata oluştu', 'error')
    } finally {
      setLoading(false)
    }
  }

  const loadImages = async () => {
    try {
      const data = await apiClient.getImages()
      setImages(data)
    } catch (error) {
      console.error('Error loading images:', error)
    }
  }

  const startEditing = (item: ContentItem) => {
    setEditingId(item.id)
    setEditingContent(item.content)
    setEditingTitle(item.title || '')
  }

  const saveContent = async () => {
    if (!editingId) return

    try {
      await apiClient.updateContent(editingId, {
        content: editingContent,
        title: editingTitle
      })
      
      setEditingId(null)
      setEditingContent('')
      setEditingTitle('')
      showNotification('İçerik başarıyla güncellendi', 'success')
    } catch (error) {
      console.error('Error saving content:', error)
      showNotification('İçerik kaydedilirken hata oluştu', 'error')
    }
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditingContent('')
    setEditingTitle('')
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setUploadingImage(true)
      await apiClient.uploadImage(file)
      showNotification('Resim başarıyla yüklendi', 'success')
    } catch (error) {
      console.error('Error uploading image:', error)
      showNotification('Resim yüklenirken hata oluştu', 'error')
    } finally {
      setUploadingImage(false)
    }
  }

  const deleteImage = async (id: string) => {
    if (!confirm('Bu resmi silmek istediğinizden emin misiniz?')) return

    try {
      await apiClient.deleteImage(id)
    } catch (error) {
      console.error('Error deleting image:', error)
      showNotification('Resim silinirken hata oluştu', 'error')
    }
  }

  const showNotification = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    // Implement toast notification
    console.log(`${type.toUpperCase()}: ${message}`)
  }

  const sections = [...new Set(content.map(item => item.section))]
  const filteredContent = selectedSection === 'all' 
    ? content 
    : content.filter(item => item.section === selectedSection)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">İçerik Editörü</h1>
          <p className="text-gray-600">Website içeriklerini gerçek zamanlı olarak düzenleyin</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${
            connectionStatus.isConnected ? 'bg-green-500' : 'bg-red-500'
          }`}></div>
          <span className="text-sm text-gray-600">
            {connectionStatus.isConnected ? 'Senkronize' : 'Bağlantı Yok'}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex gap-4 items-center">
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">Tüm Bölümler</option>
              {sections.map(section => (
                <option key={section} value={section}>{section}</option>
              ))}
            </select>
            
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                previewMode 
                  ? 'bg-primary text-black' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Eye className="w-4 h-4 mr-2 inline" />
              {previewMode ? 'Düzenleme Modu' : 'Önizleme Modu'}
            </button>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowImageManager(!showImageManager)}
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              Resim Yöneticisi
            </Button>
          </div>
        </div>
      </div>

      {/* Image Manager */}
      {showImageManager && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Resim Yöneticisi</h3>
            <div className="flex gap-2">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploadingImage}
                />
                <Button variant="outline" disabled={uploadingImage}>
                  <Upload className="w-4 h-4 mr-2" />
                  {uploadingImage ? 'Yükleniyor...' : 'Resim Yükle'}
                </Button>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {images.map((image) => (
              <div key={image.id} className="relative group">
                <img
                  src={`http://localhost:3001${image.url}`}
                  alt={image.original_name}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <button
                    onClick={() => deleteImage(image.id)}
                    className="text-white hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="absolute bottom-1 left-1 right-1 text-xs text-white bg-black/70 rounded px-1 truncate">
                  {image.original_name}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Content List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-gray-600">İçerik yükleniyor...</p>
          </div>
        ) : (
          filteredContent.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.title || `${item.section} - ${item.key}`}
                  </h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span className="bg-gray-100 px-2 py-1 rounded">{item.section}</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{item.type}</span>
                  </div>
                </div>
                
                {editingId === item.id ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={saveContent}
                      className="text-green-600 hover:text-green-800"
                    >
                      <Check className="w-5 h-5" />
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => startEditing(item)}
                    className="text-gray-600 hover:text-gray-800"
                    disabled={previewMode}
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                )}
              </div>

              {editingId === item.id ? (
                <div className="space-y-4">
                  {item.title && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Başlık
                      </label>
                      <input
                        type="text"
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      İçerik
                    </label>
                    {item.type === 'html' ? (
                      <textarea
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
                      />
                    ) : (
                      <textarea
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-4">
                  {item.type === 'html' ? (
                    <div dangerouslySetInnerHTML={{ __html: item.content }} />
                  ) : (
                    <p className="text-gray-700 whitespace-pre-wrap">{item.content}</p>
                  )}
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>

      {!loading && filteredContent.length === 0 && (
        <div className="text-center py-12">
          <Type className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">İçerik bulunamadı</h3>
          <p className="text-gray-500">Seçilen bölümde içerik bulunmuyor.</p>
        </div>
      )}
    </div>
  )
}