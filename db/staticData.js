const productsData = [
  { price: 257,
    name: "Bat signed by Babe Ruth",
    description: 'Your friends will call you a legend as well when you hit a homer out of Yankee stadium with this authentic bat signed by the Babe himself!',
    category: 'Baseball',
    image_path: "/images/baberuthsbat.jpg"
  },
  { price: 221,
    name: "Michael Jordans Game Worn Shoes",
    description: "Shoes guaranteed to make you run faster and jump higher, you can be like Mike as you play in the very shoes he wore in the epic championship game of '96!",
    category: "Basketball",
    image_path: "/images/MjShoes.jpg"
  },
  { price: 198,
    name: "Tiger Woods 9-Iron",
    description: "A must-have item for any golf enthusiast, this club is calling to the next great golfing athlete! Roar like a tiger on the green as you play through the woods!",
    category: "Golf",
    image_path: "/images/tigersclub.jpg"
  },
  { price: 171,
    name: "Tom Brady's Super Bowl Rings",
    description: "In a recent effort to downsize, Tom Brady has asked us to find a new home for his collection of Championship Rings. Put them on and see for yourself what it feels like to be a champion!",
    category: "Football",
    image_path: "/images/TombradysRings.jpg"
  },
  { price: 166,
    name: "Pele's World Cup Ball",
    description: "Your own backyard becomes the World Cup playing field as you kick this grass-stained ball that was kicked by Pele himself!",
    category: "Soccer",
    image_path: "/images/peleBall.jpg"
  },
  { price: 145,
    name: "Serena Williams Broken Rackets",
    description: "Experience the professional fury as you hold in your hands the rackets swung and smashed by the legendary Serena Williams!",
    category: "Tennis",
    image_path: "/images/sernasBrokenRackets.jpg"
  },
  { price: 126,
    name: "Zeus' Lightning Bolt",
    description: "This rare, one-of-a-kind item was recently acquired when Zeus himself was impaled by his own lightning bolt in an unfortunate scuffle with Thor. Understandably, the thunder god found it easy to part with and now it can be yours!",
    category: "Olympics",
    image_path: "/images/zeusbolt.jpg"
  },
  { price: 114,
    name: "Magic Johnson's 1987 Championship Jersey",
    description: "Whether to wear or to hang up in a place of honor, this would make a fine addition to any collector's jersey collection.",
    category: "Basketball",
    image_path: "/images/magicJohnson.jpeg"
  },
  { price: 102,
    name: "Larry Bird's 1986 Championship Jersey",
    description: "Whether to wear or to hang up in a place of honor, this would make a fine addition to any collector's jersey collection.",
    category: "Basketball",
    image_path: "/images/larryBird.png"
  },
  { price: 59,
    name: "Wayne Gretzky's 1987 Stanley Cup Jersey",
    description: "Whether to wear or to hang up in a place of honor, this would make a fine addition to any collector's jersey collection.",
    category: "Hockey",
    image_path: "/images/wayneGretzky.jpeg"
  },
  { price: 46,
    name: "Messi's World Cup Jersey",
    description: "Whether to wear or to hang up in a place of honor, this would make a fine addition to any collector's jersey collection.",
    category: "Soccer",
    image_path: "/images/messi.jpeg"
  },
  { price: 30,
    name: "Steph Curry's 2022 Championship Jersey",
    description: "Whether to wear or to hang up in a place of honor, this would make a fine addition to any collector's jersey collection.",
    category: "Basketball",
    image_path: "/images/stephcurry.jpeg"
  },
  { price: 21,
    name: "Payton Manning's Super Bowl 50 Jersey",
    description: "Whether to wear or to hang up in a place of honor, this would make a fine addition to any collector's jersey collection.",
    category: "Football",
    image_path: "/images/paytonmanning.jpeg"
  },
  { price: 10,
    name: "Megan Rapinoe's World Cup Jersey",
    description: "Whether to wear or to hang up in a place of honor, this would make a fine addition to any collector's jersey collection.",
    category: "Soccer",
    image_path: "/images/meganrapinoe.jpeg"
  }
];
// function displayImage(src, width, height){
//   var image = document.createElement("image");
//   image.src=src;
//   image.width=width;
//   image.height=height;
//   document.body.appendChild(image)
// }
// const product = productsData[0];
// const {image,width, height} = product;
// displayImage(image, width, height);

const usersData = [
  { username: "a", password: "password", isAdmin: true },
  { username: "b", password: "password", isAdmin: false },
  { username: "c", password: "password", isAdmin: false },
  { username: "d", password: "password", isAdmin: false },
  { username: "e", password: "password", isAdmin: false },
  { username: "f", password: "password", isAdmin: false },
  { username: "g", password: "password", isAdmin: false },
  { username: "h", password: "password", isAdmin: false },
  { username: "i", password: "password", isAdmin: false },
  { username: "j", password: "password", isAdmin: false },
  { username: "k", password: "password", isAdmin: false },
  { username: "l", password: "password", isAdmin: false },
  { username: "m", password: "password", isAdmin: false },
  { username: "n", password: "password", isAdmin: false },
  { username: "o", password: "password", isAdmin: false },
  { username: "p", password: "password", isAdmin: false },
  { username: "q", password: "password", isAdmin: false },
  { username: "r", password: "password", isAdmin: false }
]

 const cartData = [
  { userId: 2, productId: 2 },
  { userId: 3, productId: 3 },
  { userId: 3, productId: 4 },
  { userId: 5, productId: 5 },
  { userId: 5, productId: 6 },
  { userId: 5, productId: 7 },
  { userId: 8, productId: 8 },
  { userId: 10, productId: 9 },
  { userId: 10, productId: 9 },
  { userId: 11, productId: 10 },
  { userId: 12, productId: 10 },
  { userId: 7, productId: 11 },
  { userId: 13, productId: 12 },
  { userId: 14, productId: 13 },
  { userId: 4, productId: 14 },
]

const productsList = () => {
  return [...productsData];
};

const usersList = () => {
  return [...usersData];
}

const cartList = () => {
  return [...cartData];
}

const find = (id) => {
  const post = data.find(post => post.id === Number(id));
  return {...post};
}

module.exports = { productsList: productsList, usersList: usersList, cartList: cartList, find: find };