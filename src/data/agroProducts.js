// Localized product catalog for Ubinex focusing on Enugu State, Nigeria
export const agroProducts = [
    {
        id: "1",
        name: "Fresh Tomatoes (Basket)",
        category: "Vegetables",
        price: 4500,
        unit: "basket",
        image: "https://i.pinimg.com/736x/d3/0d/7d/d30d7dea1011bf7370e3b966619240b3.jpg",
        location: "Amorji, Nenwe (Aninri LGA)",
        stock: 50,
        description: "Freshly harvested Roma tomatoes from the fertile lands of Nenwe.",
        icon: "fa-apple"
    },
    {
        id: "2",
        name: "Nsukka Yellow Pepper",
        category: "Spices",
        price: 1500,
        unit: "kg",
        image: "https://i.pinimg.com/1200x/85/5e/74/855e74af0d4b469be60828d41e886b34.jpg",
        location: "Ihe/Owerre, Nsukka LGA",
        stock: 120,
        description: "The famous aromatic and spicy yellow pepper unique to Nsukka.",
        icon: "fa-fire"
    },
    {
        id: "3",
        name: "Pure Red Palm Oil",
        category: "Oils",
        price: 1800,
        unit: "liter",
        image: "https://i.pinimg.com/1200x/7b/f3/82/7bf3820f4cd358223af714cf59cf80bc.jpg",
        location: "Awgu Town, Awgu LGA",
        stock: 200,
        description: "Unadulterated palm oil processed locally in Awgu.",
        icon: "fa-droplet"
    },
    {
        id: "4",
        name: "Large White Yam (Tubers)",
        category: "Root Crops",
        price: 3500,
        unit: "tuber",
        image: "https://i.pinimg.com/1200x/49/4e/8e/494e8eb058f63e67fab6ef6662edf16e.jpg",
        location: "Umuagu, Inyi (Oji River LGA)",
        stock: 300,
        description: "Premium large white yams from the Inyi community.",
        icon: "fa-leaf"
    },
    {
        id: "5",
        name: "Fresh Cassava (IJW)",
        category: "Root Crops",
        price: 800,
        unit: "kg",
        image: "https://i.pinimg.com/1200x/91/47/98/914798111718a729cefb25504546123b.jpg",
        location: "Umunagbo, Ogwogo (Enugu East LGA)",
        stock: 500,
        description: "Fresh cassava tubers ready for processing into Garri or Fufu.",
        icon: "fa-leaf"
    },
    {
        id: "6",
        name: "Organic Honey",
        category: "Processed",
        price: 4500,
        unit: "bottle",
        image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=1000&auto=format&fit=crop",
        location: "Ajuona, Obukpa (Nsukka LGA)",
        stock: 45,
        description: "100% pure organic honey harvested from the bush of Obukpa.",
        icon: "fa-flask"
    },
    {
        id: "7",
        name: "Local Brown Rice",
        category: "Grains",
        price: 1200,
        unit: "kg",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=1000&auto=format&fit=crop",
        location: "Abacheku, Ndeaboh (Aninri LGA)",
        stock: 400,
        description: "Nutritious stone-free local brown rice from Aninri.",
        icon: "fa-wheat-awn"
    },
    {
        id: "8",
        name: "Fresh Garden Eggs",
        category: "Vegetables",
        price: 1200,
        unit: "small bag",
        image: "https://i.pinimg.com/1200x/3f/80/d0/3f80d002af787e9de6540dcc25341788.jpg",
        location: "Amorji, Nenwe (Aninri LGA)",
        stock: 80,
        description: "Crispy and fresh garden eggs, a local favorite.",
        icon: "fa-leaf"
    },
    {
        id: "9",
        name: "Dried Stockfish",
        category: "Fish",
        price: 8500,
        unit: "large piece",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop",
        location: "Ogbete Market, Enugu North LGA",
        stock: 60,
        description: "High quality imported and locally processed stockfish.",
        icon: "fa-fish"
    },
    {
        id: "10",
        name: "Abacha (Dried Cassava)",
        category: "Processed",
        price: 2500,
        unit: "bag",
        image: "https://images.unsplash.com/photo-1599420186946-7b6fb4e9d72a?q=80&w=1000&auto=format&fit=crop",
        location: "Amani-Odo, Ezeagu LGA",
        stock: 150,
        description: "Finely shredded and dried cassava for making the popular African Salad.",
        icon: "fa-box-open"
    }
];

export const enuguLGAs = [
  { name: "Aninri", villages: ["Ndeaboh", "Nenwe", "Mpu", "Okpanku", "Oduma"] },
  { name: "Awgu", villages: ["Awgu Town", "Agbogugu", "Ihe", "Ituku", "Mgbidi"] },
  { name: "Enugu East", villages: ["Nkwo Nike", "Emene", "Ibeagwa", "Ogwogo"] },
  { name: "Enugu North", villages: ["Ogbete", "Asata", "New Layout", "GRA"] },
  { name: "Enugu South", villages: ["Uwani", "Amechi", "Akwuke", "Ugwuaji"] },
  { name: "Ezeagu", villages: ["Aguobu-Owa", "Iwollo", "Olo", "Umumba"] },
  { name: "Igbo Etiti", villages: ["Aku", "Ukehe", "Ogbede", "Ohodo"] },
  { name: "Igbo Eze North", villages: ["Enugu-Ezike", "Etteh", "Amachara"] },
  { name: "Igbo Eze South", villages: ["Ibagwa-Aka", "Alor-Agu", "Ovoko", "Iheaka"] },
  { name: "Isi Uzo", villages: ["Ikem", "Eha-Amufu", "Neke", "Mbu"] },
  { name: "Nkanu East", villages: ["Amagunze", "Nara", "Ugbawka", "Owo"] },
  { name: "Nkanu West", villages: ["Agbani", "Akpugo", "Ozalla", "Amurri"] },
  { name: "Nsukka", villages: ["Nsukka Town", "Obukpa", "Ede-Oballa", "Opi"] },
  { name: "Oji River", villages: ["Oji River Urban", "Inyi", "Achi", "Ugwuoba"] },
  { name: "Udenu", villages: ["Obollo-Afor", "Orba", "Imilike", "Ezimo"] },
  { name: "Udi", villages: ["Udi Town", "Nachi", "Abor", "9th Mile"] },
  { name: "Uzo Uwani", villages: ["Adani", "Nimbo", "Igga", "Ogurugu"] }
];

export default agroProducts;
