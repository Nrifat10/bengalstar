/* ============================================================================
   Bangla Star Co., Ltd — Translations (EN / AR)
   ----------------------------------------------------------------------------
   Every visible string lives here. Strings are applied to the page through
   data-i18n / data-i18n-placeholder / data-i18n-aria / data-i18n-img
   attributes (see js/main.js).

   Adding a new string? Add it to BOTH "en" and "ar" at the same path.
   ========================================================================== */

const TRANSLATIONS = {

  /* ============================ ENGLISH ============================ */
  en: {
    meta: {
      title: "Bangla Star Co., Ltd | Manpower Supply for Petrol Stations in Saudi Arabia",
      description: "Bangla Star Co., Ltd supplies trained, verified workers to petrol stations across Saudi Arabia — fuel attendants, car wash staff, bakala/store workers, cashiers, tire & oil change technicians, supervisors and cleaners."
    },

    skip: "Skip to main content",

    nav: {
      home: "Home",
      about: "About Us",
      services: "Services",
      why: "Why Us",
      process: "How It Works",
      contact: "Contact",
      cta: "Get Workers",
      toggleAria: "Switch language to Arabic",
      openMenuAria: "Open navigation menu",
      closeMenuAria: "Close navigation menu"
    },

    hero: {
      ariaLabel: "Featured services",
      cta1: "Request Workers",
      cta2: "Contact Us",
      slides: [
        {
          title: "Professional Fuel Attendants for Your Station",
          sub: "Vetted, uniformed and safety-trained fuel attendants who keep your pumps busy and your customers coming back."
        },
        {
          title: "Car Wash & Detailing Teams",
          sub: "Fast, careful and consistent car wash staff who treat every vehicle like their own."
        },
        {
          title: "Bakala & Convenience Store Staff",
          sub: "Trained store keepers and helpers who keep shelves stocked and queues short."
        },
        {
          title: "Tire & Oil Change Technicians",
          sub: "Skilled technicians for quick tire services and oil changes — done right, every single time."
        },
        {
          title: "Trusted Manpower for Every Station",
          sub: "From fuel attendants to supervisors and cleaners — one partner for your entire station team."
        }
      ]
    },

    about: {
      eyebrow: "About Us",
      title: "Your Trusted Manpower Partner in the Kingdom",
      lead: "Bangla Star Co., Ltd specializes in supplying trained, verified workers to petrol stations across Saudi Arabia — from busy city stations to highway travel plazas.",
      text: "We handle recruitment, training, documentation and deployment end-to-end, so station owners get reliable staff on time — without the hassle.",
      points: [
        "Licensed & fully compliant with Saudi labor law",
        "Every worker vetted, medically tested & pre-trained",
        "Arabic & English speaking supervisors on call",
        "Free replacement guarantee for every worker"
      ],
      badgeNum: "10+",
      badgeLabel: "Years of Experience",
      cta: "Explore Our Services"
    },

    services: {
      eyebrow: "Our Services",
      title: "Workers for Every Corner of Your Station",
      sub: "Ready-to-work staff for every role your station needs — from day one.",
      link: "Request this role",
      items: [
        {
          title: "Fuel Attendants",
          desc: "Courteous, safety-trained pump attendants for fast and friendly service."
        },
        {
          title: "Car Wash Staff",
          desc: "Foam, rinse, dry and detail — teams that deliver a spotless finish."
        },
        {
          title: "Bakala / Store Staff",
          desc: "Store keepers and helpers who stock, organize and sell with care."
        },
        {
          title: "Cashiers",
          desc: "Accurate, honest cashiers for pumps, stores and POS systems."
        },
        {
          title: "Tire & Oil Change",
          desc: "Skilled technicians for tires, oil and quick mechanical services."
        },
        {
          title: "Supervisors & Cleaners",
          desc: "Shift supervisors who manage, and cleaners who keep stations shining."
        }
      ]
    },

    why: {
      eyebrow: "Why Choose Us",
      title: "Station Owners Trust Bangla Star",
      sub: "Five reasons station owners across the Kingdom choose us.",
      items: [
        {
          title: "Trained Workers",
          desc: "Every worker completes safety, service and station training before deployment."
        },
        {
          title: "Reliable & Verified",
          desc: "IDs, medicals and references fully checked — zero surprises."
        },
        {
          title: "Fast Deployment",
          desc: "From your request to workers on-site in days, not months."
        },
        {
          title: "Affordable Rates",
          desc: "Transparent pricing that works for single stations and full networks."
        },
        {
          title: "24/7 Support",
          desc: "Our team answers whenever your station needs us — day or night."
        }
      ]
    },

    process: {
      eyebrow: "How It Works",
      title: "From Request to Ready Staff in 4 Steps",
      sub: "A clear, proven process that saves you time and effort.",
      steps: [
        {
          title: "Request",
          desc: "Tell us the roles, headcount and start date via the form or WhatsApp."
        },
        {
          title: "Select",
          desc: "We shortlist vetted candidates — you interview and approve the final team."
        },
        {
          title: "Deploy",
          desc: "We handle visas, tickets and onboarding — workers arrive ready to work."
        },
        {
          title: "Support",
          desc: "Ongoing supervision, replacements and 24/7 support keep your station running."
        }
      ]
    },

    stats: {
      eyebrow: "Our Impact",
      title: "Numbers That Speak for Themselves",
      items: [
        { label: "Workers Deployed" },
        { label: "Partner Stations" },
        { label: "Years of Experience" },
        { label: "Client Satisfaction" }
      ]
    },

    testimonials: {
      ariaLabel: "Client testimonials",
      eyebrow: "Testimonials",
      title: "What Station Owners Say",
      sub: "Real feedback from station owners and operators we serve.",
      items: [
        {
          quote: "Bangla Star sent us 12 trained fuel attendants in under three weeks. Professional from the very first call — our service scores went up immediately.",
          name: "Ahmed Al-Rashid",
          role: "Station Owner, Riyadh"
        },
        {
          quote: "Their car wash team doubled our weekend throughput. Reliable staff, fair pricing, zero headaches.",
          name: "Mohammed Saleh",
          role: "Operations Manager, Jeddah"
        },
        {
          quote: "From visas to uniforms, they handled everything. We just focused on running the station.",
          name: "Khalid Al-Otaibi",
          role: "Franchise Director, Dammam"
        }
      ]
    },

    contact: {
      eyebrow: "Contact Us",
      title: "Request Workers Today",
      sub: "Tell us what your station needs — we reply within 24 hours.",
      infoTitle: "Contact Information",
      phoneLabel: "Phone",
      phone: "+966 5X XXX XXXX",
      emailLabel: "Email",
      email: "info@banglastar.com",
      addressLabel: "Address",
      address: "Office 12, Business District, Riyadh, Saudi Arabia",
      hoursLabel: "Working Hours",
      hours: "24/7 — we never sleep",
      whatsapp: "Chat on WhatsApp",
      whatsappMsg: "Hello Bangla Star, I need workers for my petrol station.",
      mapTitle: "Find us on the map",
      or: "Prefer WhatsApp?",
      formTitle: "Tell Us What You Need",
      form: {
        name: "Your Name *",
        namePh: "e.g. Abdullah Al-Sayed",
        company: "Company / Station Name",
        companyPh: "e.g. Al-Sayed Fuel Station",
        phone: "Phone / WhatsApp *",
        phonePh: "+966 5X XXX XXXX",
        type: "Worker Type *",
        typePh: "Select worker type",
        options: [
          "Fuel Attendants",
          "Car Wash Staff",
          "Bakala / Store Staff",
          "Cashiers",
          "Tire & Oil Change Workers",
          "Supervisors",
          "Cleaners",
          "Other / Multiple Roles"
        ],
        message: "Message",
        messagePh: "How many workers do you need, and when do they start?",
        submit: "Send Request",
        sending: "Sending…",
        success: "Thank you! Your request has been sent — we'll get back to you within 24 hours.",
        error: "Sorry, something went wrong. Please try again, or reach us directly on WhatsApp.",
        notConfigured: "The contact form isn't connected yet (add your Formspree ID in js/main.js) — please reach us on WhatsApp for now.",
        note: "We usually reply within 24 hours."
      }
    },

    footer: {
      tagline: "Trained, verified manpower for petrol stations across Saudi Arabia.",
      quickLinks: "Quick Links",
      servicesTitle: "Our Services",
      contactTitle: "Contact",
      rights: "All rights reserved.",
      social: {
        facebook: "Facebook",
        twitter: "X (Twitter)",
        instagram: "Instagram",
        linkedin: "LinkedIn"
      }
    },

    ui: {
      prev: "Previous",
      next: "Next",
      slide: "Slide",
      backToTop: "Back to top",
      whatsappAria: "Chat with us on WhatsApp"
    },

    img: {
      hero1: "Fuel station glowing at night with pumps ready to serve drivers",
      hero2: "Car being washed with a high-pressure water spray",
      hero3: "Brightly lit supermarket aisle stocked with products",
      hero4: "Technician tightening wheel lug nuts with a power tool",
      hero5: "Team of workers stacking hands together in teamwork",
      about: "Car driving on a desert road in Saudi Arabia",
      serviceFuel: "Attendant connecting a charging cable to a vehicle",
      serviceCarwash: "Black car being washed with pressurized water",
      serviceStore: "Interior of a modern convenience store with stocked shelves",
      serviceCashier: "Smiling staff member serving a customer at a store counter",
      serviceTire: "Mechanic working on a car engine in a workshop",
      serviceTeam: "Team of staff collaborating around a table"
    }
  },

  /* ============================ ARABIC ============================ */
  ar: {
    meta: {
      title: "بنجلا ستار المحدودة | توريد القوى العاملة لمحطات الوقود في المملكة العربية السعودية",
      description: "تورد شركة بنجلا ستار المحدودة عمالة مدرَّبة وموثقة لمحطات الوقود في جميع أنحاء المملكة العربية السعودية — عمال وقود، وعمال غسيل سيارات، وموظفو بقالة ومتاجر، وأمناء صندوق، وفنيو إطارات وتغيير زيت، ومشرفون ومنظفون."
    },

    skip: "تخطَّ إلى المحتوى الرئيسي",

    nav: {
      home: "الرئيسية",
      about: "من نحن",
      services: "خدماتنا",
      why: "لماذا نحن",
      process: "كيف نعمل",
      contact: "اتصل بنا",
      cta: "احصل على عمال",
      toggleAria: "التبديل إلى اللغة الإنجليزية",
      openMenuAria: "فتح قائمة التنقل",
      closeMenuAria: "إغلاق قائمة التنقل"
    },

    hero: {
      ariaLabel: "الخدمات المميزة",
      cta1: "اطلب عمالاً",
      cta2: "اتصل بنا",
      slides: [
        {
          title: "عمال وقود محترفون لمحطتك",
          sub: "عمال وقود مدرَّبون على أعلى معايير السلامة والخدمة، بمظهر رسمي مهني يحافظ على سلاسة عمليات محطتك على مدار الساعة."
        },
        {
          title: "فرق غسيل وتلميع السيارات",
          sub: "موظفو غسيل سريعون ودقيقون يتعاملون مع كل مركبة كأنها ملكهم — من الرغوة إلى اللمعان النهائي."
        },
        {
          title: "موظفو البقالة والمتاجر",
          sub: "فريق متجر مدرَّب يحافظ على رفوف ممتلئة وطوابير قصيرة وخدمة عملاء سريعة ومهذبة."
        },
        {
          title: "فنيو الإطارات وتغيير الزيت",
          sub: "فنيون مهرة لخدمات الإطارات وتغيير الزيت — إنجاز دقيق وسريع في كل مرة."
        },
        {
          title: "قوى عاملة موثوقة لكل محطة",
          sub: "من عمال الوقود إلى المشرفين والمنظفين — شريك واحد يغطي احتياجات فريق محطتك بالكامل."
        }
      ]
    },

    about: {
      eyebrow: "من نحن",
      title: "شريكك الموثوق للقوى العاملة في المملكة",
      lead: "تتخصص شركة Bangla Star Co., Ltd في توريد العمالة المدرَّبة والموثقة لمحطات الوقود في جميع أنحاء المملكة العربية السعودية — من محطات المدن المزدحمة إلى محطات السفر على الطرق السريعة.",
      text: "نتولى الاستقطاب والتدريب والوثائق والنشر من البداية إلى النهاية، ليحصل أصحاب المحطات على موظفين موثوقين في الوقت المحدد — دون عناء.",
      points: [
        "مرخصة ومتوافقة تماماً مع نظام العمل السعودي",
        "كل عامل تم فحصه واختباره طبياً وتدريبه مسبقاً",
        "مشرفون يتحدثون العربية والإنجليزية وعلى أهبة الاستعداد",
        "ضمان استبدال مجاني لكل عامل"
      ],
      badgeNum: "+10",
      badgeLabel: "سنوات من الخبرة",
      cta: "استكشف خدماتنا"
    },

    services: {
      eyebrow: "خدماتنا",
      title: "عمال لكل زاوية من محطتك",
      sub: "موظفون جاهزون للعمل في كل دور تحتاجه محطتك — من اليوم الأول.",
      link: "اطلب هذا الدور",
      items: [
        {
          title: "عمال الوقود",
          desc: "عمال مضخات مهذبون مدرَّبون على السلامة لخدمة سريعة وودودة."
        },
        {
          title: "عمال غسيل السيارات",
          desc: "رغوة وشطف وتجفيف وتلميع — فرق تقدم لمعة مثالية لكل مركبة."
        },
        {
          title: "البقالة / المتجر",
          desc: "أمناء متاجر ومساعدون يرتّبون الرفوف ويعرضون المنتجات ويخدمون الزبائن بإتقان."
        },
        {
          title: "أمناء الصندوق",
          desc: "أمناء صندوق دقيقون وأمناء للمضخات والمتاجر وأنظمة نقاط البيع."
        },
        {
          title: "الإطارات وتغيير الزيت",
          desc: "فنيون مهرة لخدمات الإطارات والزيت والخدمات الميكانيكية السريعة."
        },
        {
          title: "مشرفون ومنظفون",
          desc: "مشرفو ورديات يديرون العمل باقتدار، ومنظفون يبقون محطتك لامعة دائماً."
        }
      ]
    },

    why: {
      eyebrow: "لماذا تختارنا",
      title: "أصحاب المحطات يثقون ببنجلا ستار",
      sub: "خمسة أسباب تجعلنا الخيار الأول لمحطات الوقود في المملكة.",
      items: [
        {
          title: "عمال مدرَّبون",
          desc: "يُكمل كل عامل تدريبات السلامة والخدمة والمحطة قبل النشر."
        },
        {
          title: "موثوق وموثَّق",
          desc: "هويات وفحوصات طبية ومراجع مُتحقق منها — بلا مفاجآت."
        },
        {
          title: "نشر سريع",
          desc: "من طلبك إلى العمال في الموقع خلال أيام لا شهور."
        },
        {
          title: "أسعار تنافسية",
          desc: "تسعير شفاف يناسب المحطة الواحدة والشبكات الكبيرة."
        },
        {
          title: "دعم على مدار الساعة",
          desc: "فريقنا متاح متى احتجتنا — ليلاً أو نهاراً دون توقف."
        }
      ]
    },

    process: {
      eyebrow: "كيف نعمل",
      title: "من الطلب إلى فريق جاهز في 4 خطوات",
      sub: "عملية واضحة ومجرَّبة توفر عليك الوقت والجهد.",
      steps: [
        {
          title: "أرسل طلبك",
          desc: "أخبرنا بالوظائف المطلوبة والعدد وتاريخ البدء عبر النموذج أو واتساب."
        },
        {
          title: "اختر فريقك",
          desc: "نرشّح لك مرشحين موثَّقين — تجري المقابلات وتعتمد الفريق النهائي."
        },
        {
          title: "انشر العمال",
          desc: "نتولى التأشيرات والتذاكر والتهيئة — يصل العمال جاهزين للعمل."
        },
        {
          title: "دعم مستمر",
          desc: "إشراف واستبدال ودعم على مدار الساعة يبقون محطتك تعمل بكفاءة."
        }
      ]
    },

    stats: {
      eyebrow: "إنجازاتنا",
      title: "أرقام تتحدث عنا",
      items: [
        { label: "عامل تم نشرهم" },
        { label: "محطة شريكة" },
        { label: "سنوات من الخبرة" },
        { label: "رضا العملاء" }
      ]
    },

    testimonials: {
      ariaLabel: "آراء العملاء",
      eyebrow: "آراء العملاء",
      title: "ماذا يقول أصحاب المحطات",
      sub: "شهادات من أصحاب المحطات ومشغليها الذين نخدمهم.",
      items: [
        {
          quote: "أرسلت لنا بنجلا ستار اثني عشر عامل وقود مدرَّبين في أقل من ثلاثة أسابيع. احترافية منذ أول اتصال — ارتفعت تقييمات الخدمة لدينا فوراً.",
          name: "أحمد الراشد",
          role: "صاحب محطة، الرياض"
        },
        {
          quote: "ضاعف فريق غسيل السيارات لديهم إنتاجيتنا في عطلات نهاية الأسبوع. موظفون موثوقون وأسعار عادلة وبلا أي مشاكل.",
          name: "محمد صالح",
          role: "مدير عمليات، جدة"
        },
        {
          quote: "من التأشيرات إلى الزي الرسمي، تولوا كل شيء. اكتفينا نحن بالتركيز على إدارة المحطة.",
          name: "خالد العتيبي",
          role: "مدير امتياز، الدمام"
        }
      ]
    },

    contact: {
      eyebrow: "تواصل معنا",
      title: "اطلب عمالك اليوم",
      sub: "أخبرنا بما تحتاجه محطتك — نرد خلال 24 ساعة.",
      infoTitle: "معلومات التواصل",
      phoneLabel: "الهاتف",
      phone: "+966 5X XXX XXXX",
      emailLabel: "البريد الإلكتروني",
      email: "info@banglastar.com",
      addressLabel: "العنوان",
      address: "مكتب 12، الحي التجاري، الرياض، المملكة العربية السعودية",
      hoursLabel: "ساعات العمل",
      hours: "على مدار الساعة — لا ننام أبداً",
      whatsapp: "تحدث عبر واتساب",
      whatsappMsg: "مرحباً Bangla Star، أحتاج عمالاً لمحطة الوقود الخاصة بي.",
      mapTitle: "موقعنا على الخريطة",
      or: "تفضّل واتساب؟",
      formTitle: "أخبرنا بما تحتاجه",
      form: {
        name: "الاسم *",
        namePh: "مثال: عبدالله السيد",
        company: "اسم الشركة / المحطة",
        companyPh: "مثال: محطة السيد للوقود",
        phone: "الجوال / واتساب *",
        phonePh: "+966 5X XXX XXXX",
        type: "نوع العمال *",
        typePh: "اختر نوع العمال",
        options: [
          "عمال الوقود",
          "عمال غسيل السيارات",
          "عمال البقالة / المتجر",
          "أمناء الصندوق",
          "فنيو الإطارات وتغيير الزيت",
          "مشرفون",
          "منظفون",
          "أخرى / عدة أدوار"
        ],
        message: "رسالتك",
        messagePh: "كم عدد العمال الذين تحتاجهم، ومتى يبدؤون العمل؟",
        submit: "إرسال الطلب",
        sending: "جارٍ الإرسال…",
        success: "شكراً لك! تم إرسال طلبك بنجاح — سنعاود التواصل معك خلال 24 ساعة.",
        error: "عذراً، حدث خطأ ما. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة عبر واتساب.",
        notConfigured: "لم يتم ربط نموذج الاتصال بعد (أضف معرف Formspree في ملف js/main.js) — يرجى التواصل معنا عبر واتساب في الوقت الحالي.",
        note: "نرد عادةً خلال 24 ساعة."
      }
    },

    footer: {
      tagline: "قوى عاملة مدرَّبة وموثوقة لمحطات الوقود في جميع أنحاء المملكة العربية السعودية.",
      quickLinks: "روابط سريعة",
      servicesTitle: "خدماتنا",
      contactTitle: "تواصل",
      rights: "جميع الحقوق محفوظة.",
      social: {
        facebook: "فيسبوك",
        twitter: "إكس (تويتر)",
        instagram: "إنستغرام",
        linkedin: "لينكدإن"
      }
    },

    ui: {
      prev: "السابق",
      next: "التالي",
      slide: "شريحة",
      backToTop: "العودة إلى الأعلى",
      whatsappAria: "تحدث معنا عبر واتساب"
    },

    img: {
      hero1: "محطة وقود مضيئة ليلاً ومضخاتها جاهزة لخدمة السائقين",
      hero2: "سيارة تُغسل برشاش مياه عالي الضغط",
      hero3: "ممر سوبرماركت مضاء وممتلئ بالمنتجات",
      hero4: "فني يشدّ صواميل عجلة السيارة بأداة كهربائية",
      hero5: "فريق عمل يضع الأيدي معاً في لقطة تعبر عن العمل الجماعي",
      about: "سيارة تسير على طريق صحراوي في المملكة العربية السعودية",
      serviceFuel: "عامل يوصل كابل الشحن بسيارة",
      serviceCarwash: "سيارة سوداء تُغسل بماء مضغوط",
      serviceStore: "داخل بقالة عصرية برفوف ممتلئة",
      serviceCashier: "موظف مبتسم يخدم زبوناً عند كاونتر المتجر",
      serviceTire: "ميكانيكي يعمل على محرك سيارة في ورشة",
      serviceTeam: "فريق موظفين يتعاونون حول طاولة"
    }
  }
};

/* Expose global for main.js */
window.TRANSLATIONS = TRANSLATIONS;
