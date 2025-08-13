import { useState, useEffect } from "react";

const data = [
  {
    text: "Awesome Store",
    name: "XYZ",
    avatar:
      "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTEyL3Jhd3BpeGVsb2ZmaWNlNV8zZF9yZW5kZXJfY2hhcmFjdGVyX29mX2FfeW91bmdfY3V0ZV9hc2lhbl9tYW5fd18yMmJlY2QwNy04NzJkLTQwMmQtOTFmZC0yMmFiNDJkNThhOWEtbTQ3eHVyenoucG5n.png",
  },
  {},
];

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % data.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="mt-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="p-8 bg-white rounded-xl">
          <p className="text-lg italic">"{data[idx].text}"</p>
          <p className="mt-4 font-semibold"> {data[idx].name}</p>
        </div>
      </div>
    </section>
  );
}
