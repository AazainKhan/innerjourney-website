import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-oxford text-platinum py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-orange-500 mb-4">Inner Journey with Shanila</h3>
            <p className="text-platinum">
              I help female leaders and homemakers to cultivate self-awareness, shift inner narratives, and take aligned action with confidence.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="link-muted transition-colors">Work with me</Link></li>
              <li><Link href="/about" className="link-muted transition-colors">About</Link></li>
              <li><Link href="/contact" className="link-muted transition-colors">Contact</Link></li>
              <li><Link href="/resources" className="link-muted transition-colors">Resources</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link href="/clarity-coaching" className="link-muted transition-colors">Clarity Coaching</Link></li>
              <li><Link href="/career-coaching" className="link-muted transition-colors">Career Coaching</Link></li>
              <li><Link href="/numerology" className="link-muted transition-colors">Numerology for Clarity</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4 mb-4">
              <a href="https://www.facebook.com/innerjourneywithshanila/" className="link-muted transition-colors text-2xl" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://www.instagram.com/_.innerjourney_/" className="link-muted transition-colors text-2xl" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.youtube.com/channel/UCJbRrCiY4zXfojPTa17EKMg" className="link-muted transition-colors text-2xl" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="https://api.whatsapp.com/send?phone=447387973382&" className="link-muted transition-colors text-2xl" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
            <div className="space-y-2 text-platinum text-sm">
              <div>
                <span className="font-semibold">Email</span><br />
                <a href="mailto:info@innerjourney-with-shanila.com" className="underline">info@innerjourney-with-shanila.com</a>
              </div>
              <div>
                <span className="font-semibold">Phone</span><br />
                <a href="tel:+447387973382" className="underline">+44 7387 973 382</a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-platinum/80">
          <p>&copy; 2026 Shanila Khan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
