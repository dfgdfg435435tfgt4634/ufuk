# BIG BOSS Premium Kuaför - Real-Time Admin Panel

Bu proje, BIG BOSS Premium Kuaför için geliştirilmiş gerçek zamanlı admin panel sistemidir. Modern web teknolojileri kullanılarak oluşturulmuş, kapsamlı içerik yönetimi ve randevu sistemi içerir.

## 🚀 Özellikler

### Gerçek Zamanlı Senkronizasyon
- **WebSocket Bağlantısı**: Socket.IO kullanarak anlık veri senkronizasyonu
- **Canlı Güncellemeler**: Admin panelindeki değişiklikler anında website'a yansır
- **Bağlantı Durumu**: Gerçek zamanlı bağlantı durumu göstergesi
- **Otomatik Yeniden Bağlanma**: Bağlantı kopması durumunda otomatik yeniden bağlanma

### Randevu Yönetim Sistemi
- **Akıllı Rezervasyon**: Müsait saatlerin gerçek zamanlı kontrolü
- **Form Validasyonu**: Kapsamlı form doğrulama ve hata yönetimi
- **Otomatik Bildirimler**: E-posta ve SMS bildirimleri (Nodemailer & Twilio)
- **Durum Takibi**: Bekleyen, onaylanan, tamamlanan, iptal durumları
- **Tek Tıkla İşlemler**: Hızlı onaylama, iptal etme ve tamamlama

### Kapsamlı İçerik Yönetimi
- **Canlı Düzenleme**: Tüm website metinleri gerçek zamanlı düzenlenebilir
- **Resim Yöneticisi**: Yükleme, değiştirme, silme ve otomatik optimizasyon
- **Önizleme Modu**: Değişiklikleri yayınlamadan önce görüntüleme
- **Sürüm Kontrolü**: İçerik değişikliklerinin takibi
- **Bölüm Bazında Organizasyon**: İçeriklerin sayfa/bölümlere göre düzenlenmesi

### Modern Admin Dashboard
- **Responsive Tasarım**: Tüm cihazlarda mükemmel görünüm
- **Gerçek Zamanlı İstatistikler**: Canlı performans metrikleri
- **Arama ve Filtreleme**: Hızlı içerik ve randevu bulma
- **Yükleme Durumları**: Tüm işlemler için görsel geri bildirim
- **Hata Yönetimi**: Kapsamlı hata yakalama ve kullanıcı bildirimleri

## 🛠 Teknoloji Stack'i

### Frontend
- **React 18** - Modern UI kütüphanesi
- **TypeScript** - Tip güvenliği
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animasyonlar
- **Socket.IO Client** - Gerçek zamanlı iletişim
- **Lucide React** - İkonlar

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **Socket.IO** - WebSocket server
- **Supabase** - Database ve authentication
- **Multer & Sharp** - Dosya yükleme ve resim işleme
- **Nodemailer** - E-posta gönderimi
- **Twilio** - SMS bildirimleri

### Database
- **PostgreSQL** (Supabase) - Ana veritabanı
- **Real-time subscriptions** - Canlı veri güncellemeleri

## 📦 Kurulum

### Gereksinimler
- Node.js 18+
- npm veya yarn
- Supabase hesabı
- Gmail hesabı (e-posta için)
- Twilio hesabı (SMS için, opsiyonel)

### 1. Projeyi Klonlayın
```bash
git clone <repository-url>
cd bigboss-admin-panel
```

### 2. Frontend Bağımlılıklarını Yükleyin
```bash
npm install
```

### 3. Backend Kurulumu
```bash
cd server
npm install
```

### 4. Çevre Değişkenlerini Ayarlayın
`server/.env.example` dosyasını `server/.env` olarak kopyalayın ve değerleri doldurun:

```env
# Supabase Configuration
SUPABASE_URL=your-supabase-project-url
SUPABASE_ANON_KEY=your-supabase-anon-key

# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Twilio Configuration (Opsiyonel)
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=your-twilio-phone-number

# Server Configuration
PORT=3001
```

### 5. Veritabanını Kurun
Supabase dashboard'unda SQL editörünü açın ve `server/database-schema.sql` dosyasındaki komutları çalıştırın.

### 6. Uygulamayı Başlatın

Backend'i başlatın:
```bash
cd server
npm run dev
```

Frontend'i başlatın (yeni terminal):
```bash
npm run dev
```

## 🎯 Kullanım

### Admin Panel Erişimi
- Ana site: `http://localhost:5173`
- Admin panel: `http://localhost:5173/admin`

### Temel İşlemler

#### Randevu Yönetimi
1. Admin panelde "Randevular" sekmesine gidin
2. Yeni randevuları gerçek zamanlı olarak görün
3. Tek tıkla onaylama/iptal işlemleri yapın
4. Otomatik bildirimler gönderilir

#### İçerik Düzenleme
1. "İçerik Editörü" sekmesine gidin
2. Düzenlemek istediğiniz içeriği seçin
3. Değişiklikleri kaydedin
4. Website'da anında görün

#### Resim Yönetimi
1. İçerik editöründe "Resim Yöneticisi"ni açın
2. Yeni resimler yükleyin (otomatik optimizasyon)
3. Mevcut resimleri yönetin

## 🔧 API Endpoints

### İçerik Yönetimi
- `GET /api/content` - Tüm içerikleri getir
- `PUT /api/content/:id` - İçerik güncelle
- `POST /api/content` - Yeni içerik oluştur

### Randevu Yönetimi
- `GET /api/appointments` - Randevuları getir
- `POST /api/appointments` - Yeni randevu oluştur
- `PUT /api/appointments/:id` - Randevu güncelle
- `DELETE /api/appointments/:id` - Randevu sil

### Resim Yönetimi
- `GET /api/images` - Resimleri getir
- `POST /api/images/upload` - Resim yükle
- `DELETE /api/images/:id` - Resim sil

### Sistem Durumu
- `GET /api/status` - Sistem durumunu getir

## 🔄 WebSocket Events

### Client → Server
- `join-admin` - Admin odasına katıl
- `join-public` - Genel odaya katıl

### Server → Client
- `content-updated` - İçerik güncellendi
- `content-created` - Yeni içerik oluşturuldu
- `appointment-created` - Yeni randevu alındı
- `appointment-updated` - Randevu güncellendi
- `appointment-deleted` - Randevu silindi
- `image-uploaded` - Yeni resim yüklendi
- `image-deleted` - Resim silindi

## 🚀 Deployment

### Frontend (Netlify/Vercel)
1. Build komutunu çalıştırın: `npm run build`
2. `dist` klasörünü deploy edin
3. Environment variables'ları ayarlayın

### Backend (Railway/Heroku)
1. `server` klasörünü deploy edin
2. Environment variables'ları ayarlayın
3. Database bağlantısını kontrol edin

## 🔒 Güvenlik

- **Input Validation**: Tüm girişler doğrulanır
- **File Upload Security**: Sadece resim dosyaları kabul edilir
- **Rate Limiting**: API istekleri sınırlandırılır
- **CORS Configuration**: Güvenli cross-origin istekleri
- **Environment Variables**: Hassas bilgiler güvenli şekilde saklanır

## 📊 Monitoring

- **Real-time Connection Status**: Bağlantı durumu takibi
- **System Health Checks**: Sistem sağlığı kontrolleri
- **Error Logging**: Kapsamlı hata kayıtları
- **Performance Metrics**: Performans metrikleri

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 Destek

Herhangi bir sorun veya soru için:
- Issue oluşturun
- E-posta gönderin: support@bigbosskuafor.com
- WhatsApp: +90 531 491 80 35

---

**BIG BOSS Premium Kuaför** - Modern kuaförlük deneyimi için geliştirilmiştir.