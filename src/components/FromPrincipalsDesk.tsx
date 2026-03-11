import { Quote } from "lucide-react";

const FromPrincipalsDesk = () => (
  <section id="principal-desk" className="bg-gray-50 py-24">
    <div className="max-w-6xl mx-auto px-6">

      {/* Heading */}
      <div className="text-center mb-24">
        <span className="text-sm font-semibold tracking-widest uppercase text-[#eab308]">
          From the Principal’s Desk
        </span>

        <h2 className="text-3xl md:text-4xl font-bold text-[#142850] mt-3">
          A Message from Leadership
        </h2>
      </div>


      {/* ===================== PRIYANKA ===================== */}
      <div className="grid lg:grid-cols-2 gap-14 items-center mb-28">

        {/* Photo */}
        <div className="flex justify-center lg:justify-start">
          <div className="bg-white p-4 rounded-2xl shadow-lg border border-slate-200 hover:shadow-2xl transition duration-300">
            <img
              src="/Priyanka Ma'am.jpeg"
              alt="Principal Priyanka Ghosh"
              className="w-44 h-44 lg:w-72 lg:h-72 object-cover rounded-xl"
            />
          </div>
        </div>


        {/* Message */}
        <div className="max-w-xl text-center lg:text-left">

          <span className="text-xs font-semibold tracking-widest uppercase text-[#eab308]">
            Principal's Message
          </span>

          <div className="flex justify-center lg:justify-start mt-3 mb-6">
            <Quote className="w-8 h-8 text-[#eab308]" />
          </div>

          <p className="text-slate-700 text-lg leading-relaxed italic mb-6">
            “Education is not merely the pursuit of marks, but the cultivation
            of discipline, clarity, and confidence. At Shiksharthi, our mission
            is to empower every student with structured guidance and the
            courage to pursue excellence.”
          </p>

          <p className="text-slate-600 leading-relaxed mb-8">
            Since our founding, we have remained committed to academic
            integrity, continuous improvement, and nurturing young minds
            to achieve their highest potential.
          </p>

          <div>
            <p className="font-semibold text-[#142850] text-lg">
              Priyanka Ghosh
            </p>

            <p className="text-sm text-slate-500">
              Principal, Shiksharthi Academic Institute
            </p>
          </div>

        </div>
      </div>


      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#eab308]/40 to-transparent mb-28"></div>


      {/* ===================== ARGHYA ===================== */}
      <div className="grid lg:grid-cols-2 gap-14 items-center">

  {/* Message */}
  <div className="max-w-xl text-center lg:text-left order-2 lg:order-1">

    <span className="text-xs font-semibold tracking-widest uppercase text-[#eab308]">
      HOD's Message
    </span>

    <div className="flex justify-center lg:justify-start mt-3 mb-6">
      <Quote className="w-8 h-8 text-[#eab308]" />
    </div>

    <p className="text-slate-700 text-lg leading-relaxed italic mb-6">
      “True academic success is built upon consistency, mentorship,
      and a culture of encouragement. At Shiksharthi, we strive to
      create an environment where every learner feels guided and inspired.”
    </p>

    <p className="text-slate-600 leading-relaxed mb-8">
      Our vision is to combine strong academic foundations with
      character development, ensuring our students excel not only
      in examinations but in life.
    </p>

    <div>
      <p className="font-semibold text-[#142850] text-lg">
        Arghya Saha
      </p>
      <p className="text-slate-500 text-sm leading-relaxed">
  Head of Department – Physics & Mathematics
  <br />
  Shiksharthi Academic Institute
</p>
    </div>

  </div>


  {/* Photo */}
  <div className="flex justify-center lg:justify-end order-1 lg:order-2">
    <div className="bg-white p-4 rounded-2xl shadow-lg border border-slate-200 hover:shadow-2xl transition duration-300">
      <img
        src="/Arghya Sir.jpeg"
        alt="Arghya Saha"
        className="w-44 h-44 lg:w-72 lg:h-72 object-cover rounded-xl"
      />
    </div>
  </div>

</div>
    </div>
  </section>
);

export default FromPrincipalsDesk;