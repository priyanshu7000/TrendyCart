export default function Footer() {
  return (
    <footer className="w-full bg-[#120b2b] text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-white font-bold text-xl">TrendyCart</h4>
          <p className="mt-2 text-sm">Premium products delivered fast.</p>
        </div>
        <div>
          <h5 className="font-semibold">Shop</h5>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href="/products">All Products</a>
            </li>
            <li>
              <a href="/categories">Categories</a>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold">Support</h5>
          <ul className="mt-3 space-y-2 text-sm">
            <li>Contact</li>
            <li>Returns</li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold">Follow</h5>
          <div className="flex gap-3 mt-3">
            <a aria-label="Instagram">IG</a>
            <a aria-label="Twitter">TW</a>
          </div>
        </div>
      </div>
      <div className="text-center text-sm border-t border-white/10 py-4">
        © {new Date().getFullYear()} TrendyCart — All rights reserved
      </div>
    </footer>
  );
}
