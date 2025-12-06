import { MusicItem } from "../types/music";

const rawItems = [
  {
    id: "recB6qcHPxb62YJ75",
    title: "Vancouver",
    singer: "BIG Naughty (서동현)",
    price: "25000",
    img: "https://image.bugsm.co.kr/album/images/500/40752/4075248.jpg",
    amount: 1,
  },
  {
    id: "recdRxBsE14Rr2VuJ",
    title: "Empty Island",
    singer: "greenblue",
    price: "18000",
    img: "https://f4.bcbits.com/img/a1472100223_10.jpg",
    amount: 1,
  },
  {
    id: "recwTo120XST3PIoW",
    title: "golden hour",
    singer: "JVKE",
    price: "28000",
    img: "https://image.bugsm.co.kr/album/images/200/193874/19387484.jpg?version=20230503022513.0",
    amount: 1,
  },
  {
    id: "rec1JZlfCIBOPdcT2",
    title: 'Home Sweet Home(From "어쩌면 우린 헤어졌는지 모른다")',
    singer: "Gogang (고갱)",
    price: "20000",
    img: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/8d/d7/0f/8dd70fba-0a8f-b7ce-a2d2-f0d32dad2837/8809912894132.jpg/1200x1200bf-60.jpg",
    amount: 1,
  },
  {
    id: "recwTo160XST3PIoW",
    title: "Lemon",
    singer: "Kenshi Yonezu(켄시 요네즈/米津 玄師)",
    price: "30000",
    img: "https://image.bugsm.co.kr/album/images/200/7222/722272.jpg?version=20220514022202.0",
    amount: 1,
  },
  {
    id: "recaBo120XST3PIoW",
    title: "돌멩이",
    singer: "MASYTA (마시따)",
    price: "12000",
    img: "https://image.bugsm.co.kr/album/images/200/3271/327113.jpg?version=20230606014806.0",
    amount: 1,
  },
  {
    id: "recqBo123XST3PIoK",
    title: "L’Amour, Les Baguettes, Paris",
    singer: "스텔라 장(Stella Jang)",
    price: "32000",
    img: "https://image.bugsm.co.kr/album/images/200/40660/4066056.jpg?version=20211020003912.0",
    amount: 1,
  },
  {
    id: "recqBo133XST3PIoK",
    title: "NO PAIN",
    singer: "실리카겔",
    price: "22000",
    img: "https://image.bugsm.co.kr/album/images/200/40790/4079061.jpg?version=20220826063340.0",
    amount: 1,
  },
  {
    id: "recqBo145XST3PIoK",
    title: "너에게 (feat. HYUN SEO)",
    singer: "Halsoon",
    price: "20000",
    img: "https://image.bugsm.co.kr/album/images/200/204634/20463445.jpg?version=20230110013144.0",
    amount: 1,
  },
  {
    id: "recqBo129XST3PIoK",
    title: "널 떠올리는 중이야(Think About You)",
    singer: "PATEKO (파테코) , Jayci yucca(제이씨 유카)",
    price: "25000",
    img: "https://image.bugsm.co.kr/album/images/200/40581/4058181.jpg?version=20210726063528.0",
    amount: 1,
  },
  {
    id: "rdaqBo129XST3PIoK",
    title: "끝나지 않은 얘기(feat. 다이나믹 듀오)",
    singer: "릴러말즈 & TOIL",
    price: "23000",
    img: "https://image.bugsm.co.kr/album/images/200/204692/20469237.jpg?version=20220827004220.0",
    amount: 1,
  },
  {
    id: "rdaqBo149XQT3PIoK",
    title: "각자의 밤",
    singer: "나상현씨 밴드",
    price: "21000",
    img: "https://image.bugsm.co.kr/album/images/200/202235/20223594.jpg?version=20230904194021.0",
    amount: 1,
  },
];

const cartItems: MusicItem[] = rawItems.map((item) => ({
  ...item,
  price: Number(item.price),
}));

export default cartItems;
