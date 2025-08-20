export default function CTABanner() {
  return (
    <section className="w-full mt-12">
      <div className="w-full bg-gradient-to-r from-purple-700 via-purple-600 to-purple-500 text-white py-6 text-center">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="text-lg font-semibold">
            Sign up & get 10% off your first order!
          </div>
          <a
            href="/signup"
            className="bg-white text-purple-700 px-5 py-2 rounded-full font-semibold"
          >
            Join Now
          </a>
        </div>
      </div>
    </section>
  );
}
