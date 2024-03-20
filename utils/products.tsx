//I am changing the image links from firebase to amazon, firebase has issues with these direct links. Please remember to add the amazon link(that will show up at the error) instead of firebase at the cofig for it to work out.

export const products = [
  {
    id: '64a654593e91b8e73a351e9b',
    name: 'iphone 14',
    description: 'Short description',
    price: 2999,
    brand: 'apple',
    category: 'Phone',
    active: true,
    images: [
      {
        color: 'White',
        colorCode: '#FFFFFF',
        image: 'https://m.media-amazon.com/images/I/71p-tHQ0u1L._AC_SX679_.jpg'
      },
      {
        color: 'Gray',
        colorCode: '#808080',
        image: 'https://m.media-amazon.com/images/I/417tEj3iJ8L._AC_.jpg'
      },
      {
        color: '',
        colorCode: '',
        image: 'https://m.media-amazon.com/images/I/417tEj3iJ8L._AC_.jpg'
      },
      {
        color: '',
        colorCode: '',
        image:
          'data:image/jpeg;base64,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'
      }
    ],
    reviews: []
  },
  {
    id: '64a4ebe300900d44bb50628a',
    name: 'Logitech MX Keys Advanced Wireless Illuminated Keyboard, Tactile Responsive Typing, Backlighting, Bluetooth, USB-C, Apple macOS, Microsoft Windows, Linux, iOS, Android, Metal Build (Black)',
    description:
      'PERFECT STROKE KEYS - Spherically-dished keys match the shape of your fingertips, offering satisfying feedback with every tap\nCOMFORT AND STABILITY - Type with confidence on a keyboard crafted for comfort, stability, and precision',
    price: 102.99,
    brand: 'logitech',
    category: 'Accesories',
    active: true,
    images: [
      {
        color: 'Black',
        colorCode: '#000000',
        image:
          'https://m.media-amazon.com/images/I/71gOLg2-kqL.__AC_SX300_SY300_QL70_FMwebp_.jpg'
      }
    ],
    reviews: [
      {
        id: '64a65a6158b470c6e06959ee',
        userId: '6475af156bad4917456e6e1e',
        productId: '64a4ebe300900d44bb50628a',
        rating: 5,
        comment: 'good',
        createdDate: '2023-07-06T06:08:33.067Z',
        user: {
          id: '6475af156bad4917456e6e1e',
          name: 'Charles',
          email: 'example@gmail.com',
          emailVerified: null,
          image:
            'https://lh3.googleusercontent.com/a/AAcHTteOiCtILLBWiAoolIW9PJH-r5825pBDl824_8LD=s96-c',
          hashedPassword: null,
          createdAt: '2023-05-30T08:08:53.979Z',
          updatedAt: '2023-05-30T08:08:53.979Z',
          role: 'ADMIN'
        }
      }
    ]
  },
  {
    id: '648437b38c44d52b9542e340',
    name: 'Apple iPhone 13, 64GB',
    description:
      'The product is refurbished, fully functional, and in excellent condition. Backed by the 90-day E~Shop Renewed Guarantee.\n- This pre-owned product has been professionally inspected, tested and cleaned by Amazon qualified vendors. It is not certified by Apple.\n- This product is in "Excellent condition". The screen and body show no signs of cosmetic damage visible from 12 inches away.\n- This product will have a battery that exceeds 80% capacity relative to new.\n- Accessories may not be original, but will be compatible and fully functional. Product may come in generic box.\n- Product will come with a SIM removal tool, a charger and a charging cable. Headphone and SIM card are not included.\n- This product is eligible for a replacement or refund within 90-day of receipt if it does not work as expected.\n- Refurbished phones are not guaranteed to be waterproof.',
    price: 40,
    brand: 'Apple',
    category: 'Phone',
    active: true,
    images: [
      {
        color: 'Black',
        colorCode: '#000000',
        image: 'https://m.media-amazon.com/images/I/61g+McQpg7L._AC_SX679_.jpg'
      },
      {
        color: 'Blue',
        colorCode: ' #0000FF',
        image: 'https://m.media-amazon.com/images/I/713Om9vCHUL._AC_SX679_.jpg'
      },
      {
        color: 'Red',
        colorCode: '#FF0000',
        image:
          'https://m.media-amazon.com/images/I/61thdjmfHcL.__AC_SX300_SY300_QL70_FMwebp_.jpg'
      }
    ],
    reviews: [
      {
        id: '6499b4887402b0efd394d8f3',
        userId: '6499b184b0e9a8c8709821d3',
        productId: '648437b38c44d52b9542e340',
        rating: 4,
        comment:
          'good enough. I like the camera and casing. the delivery was fast too.',
        createdDate: '2023-06-26T15:53:44.483Z',
        user: {
          id: '6499b184b0e9a8c8709821d3',
          name: 'Chaoo',
          email: 'example1@gmail.com',
          emailVerified: null,
          image:
            'https://lh3.googleusercontent.com/a/AAcHTtcuRLwWi1vPKaQOcJlUurlhRAIIq2LgYccE8p32=s96-c',
          hashedPassword: null,
          createdAt: '2023-06-26T15:40:52.558Z',
          updatedAt: '2023-06-26T15:40:52.558Z',
          role: 'USER'
        }
      },
      {
        id: '6499a110efe4e4de451c7edc',
        userId: '6475af156bad4917456e6e1e',
        productId: '648437b38c44d52b9542e340',
        rating: 5,
        comment: 'I really liked it!!',
        createdDate: '2023-06-26T14:30:40.998Z',
        user: {
          id: '6475af156bad4917456e6e1e',
          name: 'Charles',
          email: 'example@gmail.com',
          emailVerified: null,
          image:
            'https://lh3.googleusercontent.com/a/AAcHTteOiCtILLBWiAoolIW9PJH-r5825pBDl824_8LD=s96-c',
          hashedPassword: null,
          createdAt: '2023-05-30T08:08:53.979Z',
          updatedAt: '2023-05-30T08:08:53.979Z',
          role: 'ADMIN'
        }
      }
    ]
  },
  {
    id: '64a4e9e77e7299078334019f',
    name: 'Logitech MX Master 2S Wireless Mouse – Use on Any Surface, Hyper-Fast Scrolling, Ergonomic Shape, Rechargeable, Control Upto 3 Apple Mac and Windows Computers, Graphite',
    description:
      'Cross computer control: Game changing capacity to navigate seamlessly on 3 computers, and copy paste text, images, and files from 1 to the other using Logitech flow\nDual connectivity: Use with upto 3 Windows or Mac computers via included Unifying receiver or Bluetooth Smart wireless technology. Gesture button- Yes',
    price: 70,
    brand: 'logitech',
    category: 'Accesories',
    active: true,
    images: [
      {
        color: 'Graphite',
        colorCode: ' #383838',
        image:
          'https://m.media-amazon.com/images/I/61ni3t1ryQL.__AC_SX300_SY300_QL70_FMwebp_.jpg'
      }
    ],
    reviews: []
  },
  {
    id: '649d775128b6744f0f497040',
    name: 'Smart Watch(Answer/Make Call), 1.85" Smartwatch for Men Women IP68 Waterproof, 100+ Sport Modes, Fitness Activity Tracker, Heart Rate Sleep Monitor, Pedometer, Smart Watches for Android iOS, 2023',
    description:
      'Bluetooth Call and Message Reminder: The smart watch is equipped with HD speaker, after connecting to your phone via Bluetooth, you can directly use the smartwatches to answer or make calls, read messages, store contacts, view call history. The smartwatch can set up more message notifications in "GloryFit" APP. You will never miss any calls and messages during meetings, workout and riding.',
    price: 50,
    brand: 'Nerunsa',
    category: 'Watch',
    active: true,
    images: [
      {
        color: 'Black',
        colorCode: '#000000',
        image:
          'https://m.media-amazon.com/images/I/71s4mjiit3L.__AC_SX300_SY300_QL70_FMwebp_.jpg'
      },
      {
        color: 'Silver',
        colorCode: '#C0C0C0',
        image:
          'https://m.media-amazon.com/images/I/71zbWSRMaYL.__AC_SX300_SY300_QL70_FMwebp_.jpg'
      }
    ],
    reviews: []
  }
];
