//module.exportslà đối tượng thực sự được trả về như là kết quả của một requirecuộc gọi
module.exports = {
    register: "/api/v1/register",
    verifyUsername: "/api/v1/verifyUsername",
    login: "/api/v1/login",
    ibanking: "/api/v1/payment/depositbank",
    paywin: "/api/v1/payment/smartpay",
    card: "/api/v1/payment/depositcard",
    momo: "/api/v1/momo/code",
    withdrawbank: "/api/v1/payment/withdrawbank",
    withdrawcard: "/api/v1/payment/withdrawcard",
    updateInfo: "/api/v1/updateInfo",
    tintuc: "/api/v1/posts/?catIds=6",
    taisaochonchungtoi: "/api/v1/post/?alias=tai-sao-chon-chung-toi",
    soikeonhacaihomnay: "/api/v1/post/?alias=ty-le-keo-ty-le-bong-da-soi-keo-nha-cai-hom-nay-truc-tuyen",
    dieukhoanvadieukien: "/api/v1/post/?alias=debet-dieu-khoan-dieu-kien",
    keochaua: "/api/v1/athenaUrl",
    keochauau: "/api/v1/ssportUrl",
    nhungcauhoithuonggap: "/api/v1/post/?alias=debet-nhung-cau-hoi-thuong-gap",
    gioithieu: "/api/v1/post/?alias=gioi-thieu",
    chinhsachbaomat: "/api/v1/post/?alias=debet-chinh-sach-bao-mat",
    download: "/download",
    huongdannaptien: "/api/v1/post/?alias=huong-dan-nap-tien",
    huongdanruttien: "/api/v1/post/?alias=huong-dan-rut-tien",
    huongdancacuoc: "/api/v1/post/?alias=huong-dan-ca-cuoc",
    hotmatch: "/api/v1/hotmatch",
    whitelist: "/api/v1/whitelist/add",
    verifyEmail: "/api/v1/verifyEmail",
    forgotPassword: "/api/v1/forgotPassword",
    favorites: "/api/v1/home/games/favorites",
    wallet: "/api/v1/wallet",

    //sport
    psport: "/api/v1/athenaUrl",
    csport: "/api/v1/ssportUrl",
    ksport: "/api/v1/ksportUrl",
    ssport: "/api/playGame?partnerProvider=im&partnerGameId=sport",

    //account
    indexaccount: "/api/v1/indexaccount",
    lichsucacuoc: "/api/v1/lsb?page=1&limit=10&start=01-09-2021&end=30-09-2021",
    lichsupsport: "/api/v1/lsbAthena?page=1&limit=10&start=01-09-2021&end=30-09-2021",
    lichsugiaodich: "/api/v1/lsgd",
    

    //games
    casino: "/api/v1/casino",
    gamebai: "/api/v1/games/search?category_name=gamebai",
    keno: "/api/v1/kenoUrl",
    lode: "/api/v1/lodeUrl",
    lodesieutoc: "/api/v1/lodeSieuTocUrl",
    quaysomunich: "/api/v1/lotteryUrl",
    quaysoberlin: "/api/v1/tableGameUrl",
    quaysoatom: "/api/v1/lotteryAtomUrl",
    banca: "/api/v1/games/search?category_name=fishing",
    congame: "/api/v1/games/search?category_name=all",
    ingame: "/api/v1/games/search?category_name=ingame",

    //game providers
    allproviders: "/api/v1/games/search?category_name=all&provider=all",
    microgaming: "/api/v1/games/search?provider=microgaming",
    pragmaticplay: "/api/v1/games/search?provider=pragmatic-play",
    cq9: "/api/v1/games/search?provider=cq9",
    evoplay: "/api/v1/games/search?provider=evoplay",
    playngo: "/api/v1/games/search?provider=playngo",
    techplay: "/api/v1/games/search?provider=techplay",
    qtech: "/api/v1/games/search?provider=qtech",
    evo: "/api/v1/games/search?provider=evo",
    playngo: "/api/v1/games/search?provider=playngo",
    spribe: "/api/v1/games/search?provider=spribe",






    

}