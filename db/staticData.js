const productsData = [
  { id: 1, price: 257, name: "Lorem Ipsum Dolor Sit Amet", description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit in dui eget dignissim. Etiam cursus ex eget iaculis luctus. Curabitur sagittis orci a tellus vulputate. Integer ut sapien massa. Nunc massa tortor, tincidunt vel sem sed, facilisis posuere leo. Donec sed massa feugiat odio rhoncus suscipit aliquet id.', category: 'Evazahr', image_path: "/images/baberuthsbat.jpg"},
  { id: 2, price: 221, name: "Michael Jordans Game Worn Shoes", description: "Integer purus leo, condimentum ac sapien eu, consequat cursus dui. Maecenas ultricies velit nunc, vel ultrices ex euismod eget. Vivamus nisl nulla, aliquet sit amet nisl vel, consequat ultrices erat. Nam egestas eget tellus quis varius. Nunc quis nulla feugiat, facilisis ipsum et, egestas justo. Suspendisse scelerisque pretium lorem, eget.", category: "Druxium", image_path: "/images/MjShoes.jpg"},
  { id: 3, price: 198, name: "Tiger Woods 9-Iron ", description: "Fusce ac erat viverra, blandit lorem vitae, lobortis est. Phasellus posuere dui justo, at posuere tortor iaculis sit amet. Curabitur semper in velit id facilisis. Praesent iaculis justo magna, et convallis sem scelerisque at. Nullam pretium dictum porta. Donec vestibulum nunc urna, eu condimentum lorem dictum quis. Praesent mollis diam.", category: "Ophiane", image_path: "/images/tigersclub.jpg"},
  { id: 4, price: 171, name: "Tom Brady's Super Bowl Rings", description: "Aenean viverra pulvinar risus in scelerisque. Nunc quis odio non leo tempor pretium sed mollis mauris. Maecenas ultrices nec quam a cursus. Duis rhoncus lorem et placerat tincidunt. Morbi sed nibh aliquet, varius ipsum a, eleifend neque. Curabitur volutpat vitae augue sit amet condimentum. Nam suscipit dictum nisi, nec porta.", category:"Ritosh", image_path:"/images/TombradysRings.jpg"},
  { id: 5, price: 166, name: "Volutpat Consequat Eros Euismod", description: "Etiam ultricies in dui ac porttitor. Nulla venenatis interdum tortor, volutpat consequat eros euismod in. Donec non tincidunt felis, sit amet luctus erat. Sed eget diam maximus, iaculis urna in, ullamcorper eros. Nullam semper dui et ultricies accumsan. Donec eget lacus elementum, varius orci at, interdum ante. Pellentesque egestas aliquam.", category: "Ziless"},
  { id: 6, price: 145, name: "Tempor Accumsan - Mauris Pharetra Ante Nunc", description: "Nunc egestas tempor mi sit amet mattis. Aliquam erat volutpat. Ut tempor accumsan ex, in consequat nunc. Etiam felis quam, accumsan sit amet nulla non, interdum tristique arcu. Integer ut nisl ipsum. Integer ac eros elit. Mauris pharetra ante nunc, sit amet elementum turpis efficitur in. Sed vitae purus in.", category: "Soqor"},
  { id: 7, price: 126, name: "Tristique! Nulla Eget Suscipit Tortor", description: "Morbi tristique elit risus, nec condimentum lorem egestas sit amet. Nulla eget suscipit tortor, nec rutrum nibh. In hac habitasse platea dictumst. Mauris mauris eros, porttitor at aliquam sed, malesuada non neque. Quisque ut ipsum nec mi ultrices porttitor quis eget eros. Curabitur sollicitudin justo quis ligula rhoncus scelerisque. In.", category: "Etior" },
  { id: 8, price: 114, name: "Pellentesque feugiat? Aliquet Sit Amet", description: "Sed augue lorem, facilisis eu enim vel, volutpat facilisis nunc. In faucibus erat quis rutrum. Sed nec mi egestas, aliquet tellus nec, dictum tortor. Phasellus interdum in enim id sodales. Donec in varius sem. Quisque euismod tellus arcu, vel vehicula turpis pellentesque quis. Vivamus nec ultrices mi. Pellentesque feugiat.", category: "Meylu"},
  { id: 9, price: 102, name: "Vestibulum Sapien Vulputate", description: "Maecenas lacinia urna arcu, sit amet vestibulum sapien vulputate quis. Pellentesque vestibulum, ipsum ut fringilla consequat, lacus lorem vestibulum felis, quis porttitor lorem nisi a arcu. In pretium egestas enim, at ornare tortor convallis a. Praesent ligula erat, commodo sed felis in, dictum blandit mauris. Vivamus nunc enim, sodales vel.", category: "Rheviar"},
  { id: 10, price: 59, name: "Justo Vel Imperdiet Interdum, Urna Massa Imperdiet", description: "In facilisis, purus eu aliquet porttitor, lorem justo mattis sapien, et interdum tortor orci eu felis. Nullam lacinia dui quis eleifend suscipit. Vivamus condimentum nunc non congue efficitur. In quis eros dignissim, sagittis est et, venenatis metus. Etiam dignissim quis nibh at consequat. Nunc non mi aliquet, pulvinar nulla a.", category: "Zallaes"},
  { id: 11, price: 46, name: "Nullam Cursus", description: "Duis tempus urna non vulputate consectetur. Nullam cursus, justo vel imperdiet interdum, urna massa imperdiet nulla, a laoreet neque risus et lectus. Integer varius fermentum ornare. Maecenas ornare libero non aliquam consectetur. Donec in justo non libero viverra laoreet ac id nunc. Ut ac mi urna. Nunc sem dui, posuere.", category: "Chalyn"},
  { id: 12, price: 30, name: "Quisque Pulvinar Tellus Vel Mattis", description: "Quisque pulvinar tellus vel mattis venenatis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis aliquet ex at lacus sodales, eget malesuada ex porttitor. Morbi volutpat, tellus tincidunt sagittis ultricies, sem tortor pulvinar ante, vitae gravida enim mauris ac nulla. Curabitur euismod imperdiet lectus ac volutpat. Etiam sed.", category: "Esufyne"},
  { id: 13, price: 21, name: "Varius Magna: Turpis, Ac Tempus Dui Quis", description: "Cras cursus justo nec tortor sodales, tincidunt posuere massa pulvinar. Quisque neque ex, venenatis eget ante nec, volutpat ultrices elit. Pellentesque varius magna turpis, ac tempus dui convallis quis. Quisque porttitor semper purus quis scelerisque. Donec consectetur ullamcorper risus, nec consectetur ligula laoreet sit amet. Morbi non eros quam. In.", category: "Grikius"},
  { id: 14, price: 10, name: "Dignissim Mauris Ac Dapibus", description: "Phasellus dignissim mauris ac dapibus aliquet. Pellentesque congue nibh rutrum, fringilla arcu eu, dignissim est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam non ligula eleifend, interdum erat a, ornare nulla. Nunc in aliquam ex, non maximus ipsum. Praesent varius metus vitae nibh rutrum.", category: "Avile"}
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
  { id: 101, username: "a", password: "password" },
  { id: 102, username: "b", password: "password" },
  { id: 103, username: "c", password: "password" },
  { id: 104, username: "d", password: "password" },
  { id: 105, username: "e", password: "password" },
  { id: 106, username: "f", password: "password" },
  { id: 107, username: "g", password: "password" },
  { id: 108, username: "h", password: "password" },
  { id: 109, username: "i", password: "password" },
  { id: 110, username: "j", password: "password" },
  { id: 111, username: "k", password: "password" },
  { id: 112, username: "l", password: "password" },
  { id: 113, username: "m", password: "password" },
  { id: 114, username: "n", password: "password" },
  { id: 115, username: "o", password: "password" },
  { id: 116, username: "p", password: "password" },
  { id: 117, username: "q", password: "password" },
  { id: 118, username: "r", password: "password" }
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