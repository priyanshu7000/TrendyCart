const items = [
  {title:"Free Shipping", desc:"On orders over ₹999", icon:"🚚"},
  {title:"Easy Returns", desc:"30-day returns", icon:"🔁"},
  {title:"Secure Payment", desc:"Multiple gateways", icon:"🔒"},
];

export default function WhyChooseUs(){
  return (
    <section className="mt-16 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map(i=>(
          <div key={i.title} className="p-6 rounded-xl bg-white/5 backdrop-blur-sm text-center">
            <div className="text-4xl mb-3">{i.icon}</div>
            <h4 className="font-semibold">{i.title}</h4>
            <p className="text-sm mt-1 text-gray-200">{i.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
