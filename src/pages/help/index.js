import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../App';
import CaakNews from '../../images/caak-news.png';
import CaakPodcast from '../../images/caak-podcast.png';
import CaakRadio from '../../images/Caak-radio.png';
import CaakEnt from '../../images/caak-entertainment.png';
import Caak from '../../images/New-Logo.svg';
import { useLocation } from 'react-router-dom';
import VideoContent from '../../assets/images/newsmade.png';
import OntslohNews from '../../assets/images/ontsloh.png';
import NewsMade from '../../assets/images/realnews.png';
import BannerModal from '../../component/modal/BannerModal';

//prettier-ignore
const Tabs = [
    {
        icon: 'icon-fi-rs-info',
        name: 'Бидний тухай',
    },
    {
        icon: 'icon-fi-rs-megaphone',
        name: 'Сурталчилгаа байршуулах',
    },
    {
        icon: 'icon-fi-rs-mail-f',
        name: 'Холбоо барих',
    },
    {
        icon: 'icon-fi-rs-shield',
        name: 'Нууцлалын баталгаа',
    },
    {
        icon: 'icon-fi-rs-article-f',
        name: 'Үйлчилгээний нөхцөл',
    },
]

//prettier-ignore
const Reclam = [
    {
        icon: 'icon-fi-rs-check',
        title: 'Том хэмжээтэй баннеруудыг оновчтой, олон газар байршуулах боломжтой.',
        color: '#DFEDF1',
        textColor: '#163943'
    },
    {
        icon: 'icon-fi-rs-multimedia',
        title: 'Видео, зураг, хөдөлгөөнт зургийг баннер, стори хэлбэрээр харуулж болно.',
        color: '#F2DFF2',
        textColor: '#463146'
    },
    {
        icon: 'icon-fi-rs-devices',
        title: 'Бүх төрлийн төхөөрөмж (гар утас, таблет, компьютер)-нд таны баннер харагдана.',
        color: '#E2DEF2',
        textColor: '#1E1642'
    },
    {
        icon: 'icon-fi-rs-visible',
        title: 'Таны сурталчилгаа, постыг хэрэглэгчийн нүдэнд өртөх боломжтой бүх газар харуулах бөгөөд нийгмийн сүлжээгээр (facebook, twitter)-ээр үнэ төлбөргүй түгээнэ.',
        color: '#F2F1DF',
        textColor: '#5D5B42'
    },
    {
        icon: 'icon-fi-rs-discount',
        title: 'Олон удаа төлбөртэй мэдээ өгөх, эсвэл олон хоног баннер байршуулах үед хямдрал болон БОНУС авах боломжтой.',
        color: '#DEE5F2',
        textColor: '#233C6A'
    },
    {
        icon: 'icon-fi-rs-handshake',
        title: 'Хагас болон Бүтэн жилээр баннер байршуулах бол танай байгууллагт зориулан хямдарсан тусгай БАГЦ ҮНИЙН САНАЛЫГ гаргаж өгнө.',
        color: '#F3DEDE',
        textColor: '#813333'
    },
]

//prettier-ignore
const caakNames = [
    {
        image: Caak,
        name: 'Caak.mn',
        desc: 'Мэдээ мэдээллийн халуун цэг!',
        url: 'https://www.caak.mn/'
    },
    {
        image: CaakEnt,
        name: 'Caak Видео',
        desc: 'Таны мэлмийг нээж, оюуныг баясгах суваг!',
        url: 'https://www.youtube.com/c/CaakVideo'
    },
    {
        image: CaakRadio,
        name: 'Caak Radio',
        desc: 'Ажлаа хийнгээ хит дуунуудаа сонс!',
        url: 'https://www.caak.mn/radio/'
    },
]

//prettier-ignore
const security = [
    {
        name: 'Хувийн мэдээлэл хэрхэн цуглуулагдаж яаж хэрэглэгдэх вэ?',
        desc: 'Таны манай бүхий л цахим хуудас үйлчилгээний салбаруудад оруулж өгсөн мэдээлэл манай мэдээлэлийн баазад аюулгүйгээр хадгалагдах болно. Та өөрөө хүсэх юм бол зарим нэг мэдээллийг оруулахгүй байж болох бөгөөд энэ нь таныг манай сүлжээний олон давуу талуудыг ашиглахад саад болох магадлалтай. Бид таны оруулсан мэдээллийг зөвхөн танд тустай нөхцөлөөр буюу таны хүсэлтэнд хариулах, цааш цаашдын үйлчилгээнд шинэчлэл хийхэд анхаарах, тантай холбоо барих зэрэгт ашиглана. Мөн та өөрөө оруулсан мэдээллээ хэдийд ч харж өөрчлөх боломжтой.'
    },
    {
        name: 'Мэдээлэл хэр найдвартай хамгаалагддаг вэ?',
        desc: 'Таны мэдээллийг хүлээн авахдаа бид SSL буюу мэдээллийг өндөр нууцлалтайгаар интернэтээр дамжуулах технологи хэрэглэдэг. Бид таны оруулсан хувийн мэдээллийг чандлан хадгалагдаж хэн нэгэн гуравдагч этгээдэд дамжуулахгүй бөгөөд манай мэдээллийн бааз нь хорлон сүйтгэгчдээс сайтар хамгаалагдсан. Мөн та өөрөө мэдээллийн аюулгүй байдлаа хангах үүднээс гуравдагч этгээдэд нэвтрэх нэр, нууц үгээ дамжуулахаас зайлсхийж, нийтийн тооцоолуур ашиглаж байгаад дуусахдаа бүртгэлээсээ гарч байна уу!'
    },
    {
        name: 'Мэдээллийн халдашгүй байдалд хандах тохиолдол байгаа юу?',
        desc: 'Манай эрх ашигт ямар нэгэн байдлаар халдахыг оролдож, хор хөнөөл учруулахыг завдсан тохиолдолд Манай гишүүдийн эрх ашиг хууль бусаар хөндөгдсөн тохиолдолд Хууль хяналтын байгууллагын албан ёсны шаардлага баримт дээр үндэслэн хамтран ажиллаж байгаа нөхцөлд Эдгээрээс бусад ямар ч нөхцөлд мэдээллийн нууцыг бусдад дамжуулахгүй чандлан хадгална.'
    },
    {
        name: 'Насанд хүрээгүй хэрэглэгчдэд үйлчлэх үү?',
        desc: 'Caak.mn сайтын зарим үйлчилгээнд хэрэглэгчийн доод хязгаарыг зааж өгдөг ба бусад тохиолдолд манай үйлчилгээний нөхцөлийн дагуу бүхий л насны хэрэглэгчид хэрэглэх боломжтой.'
    },
    {
        name: 'Харилцаа, хамтын ажиллагаанд нууцлал баталгаатай юу?',
        desc: 'Манайх бусад үйлчилгээний байгууллагуудтай хамтран ажиллах боложтой бөгөөд тэдгээр хамтрагчдад хамаарах нууцлалын асуудлыг бид хариуцахгүй. Дахин сануулахад таны хувийн мэдээлэл чандлан хадгалагдах тул манай хамтрагчид ямар нэгэн байдлаар таны хувийн мэдээлэлд халдах боломжгүй.'
    },
    {
        name: 'Өөрчлөлт орох уу?',
        desc: 'Дээр дурдсан нууцлалын баталгаанд бид ямар нэгэн анхааруулгатай буюу анхааруулгагүй өөрлөлт оруулах эрхтэй бөгөөд та манай цахим хуудаснаас хамгийн сүүлийн хувилбартай танилцаж байна уу!'
    },
]

//prettier-ignore
const caakAds = [
    {
        pos: 'A1',
        size: '1300х200',
        desc: 'Нүүр хуудас болон мэдээний дэлгэрэнгүйн толгойн хэсэгт харагдана.'
    },
    {
        pos: 'A2',
        size: '420х520',
        desc: 'Нүүр хуудсан дээрх мэдээний жагсаалт дунд олон дамтамжтай ялгарч харагдана.'
    },
    {
        pos: 'A3',
        size: '340х500, 780х780',
        desc: 'Компьютераас үзэх үед мэдээний баруун талд дагаж харагдах бол утсаар үзэхэд доороос дээшээ гүйж гарч ирнэ.'
    },
    // {
    //     pos: 'A4',
    //     size: '150x150, 500x500',
    //     desc: 'Нүүр хуудас болон мэдээ үзэж байхад зүүн доод булангаас хөдөлгөөнт хэлбэрээр гарч ирдэг pop-up баннер.'
    // },
]

//prettier-ignore
const moneyNews = [
    // {
    //     pos: 'ВИДЕО КОНТЕНТ',
    //     desc: 'Тухайн байгууллагын үйлчилгээ, бүтээгдэхүүнийг далд хэлбэрээр сурталчилсан сонирхолтой видео контент бүтээж өгнө. Түгээх суваг: facebook, Youtube, Instagram',
    //     pic: VideoContent
    // },
    {
        pos: 'ОНЦЛОХ МЭДЭЭ',
        desc: 'Нүүр хуудасны хамгийн эхэнд 24 цаг онцлогдоно. Мөн мэдээний жагсаалт дунд ялгарч харагдана. Сайтын баруунд доод хэсгээс pop-up хэлбэрээр хэрэглэгчид санал болгоно. Сайтын сошиал (facebook, twitter) сувгуудаар давхар шэйр хийгдэнэ',
        pic: OntslohNews
    },
    {
        pos: 'МЭДЭЭ, НИЙТЛЭЛ БЭЛТГЭХ',
        desc: 'Тухайн үйлчилгээ, бүтээгдэхүүнийг далд хэлбэрээр сурталчилсан сонирхолтой мэдээ бэлтгэж өгнө. Мөн дараах сувгуудаар түгээж өгнө: Caak.mn, фэйсбүүк, Твиттер',
        pic: NewsMade
    },
]

//prettier-ignore
export default function Help() {
    const location = useLocation();
    const [selected, setSelected] = useState(0)
    const [hovered, setHovered] = useState(false)
    const [open, setOpen] = useState(false)
    const [hoveredNews, setHoveredNews] = useState(false)
    const context = useContext(AppContext);

    // useEffect(() => {
    //     window.scrollTo(0, 0)
    // }, [])

    const toggleHover = (e) => {
        setHovered(e)
    }

    const toggleHoverNews = (e) => {
        setHoveredNews(e)
    }

    useEffect(() => {
        context.setStore('default');
    }, []);

    useEffect(() => {
        setSelected(location.state || 0)
        window.scrollTo(0, 0)
      }, [location.state])
    return (
        //prettier-ignore
        <div className='w-full flex flex-col items-center bg-[#F5F5F5]'>
            <div className="w-full h-[230px] md:h-[340px] bg-[#463146] flex justify-center px-[16px]">
                <div className='max-w-[1310px] w-full flex flex-row justify-between items-center'>
                    <div className='max-w-[480px] w-full'>
                        <p className='text-[35px] md:text-[52px] text-white condMedium leading-[41px] md:leading-[54px]'>Мэдээ мэдээллийн төв цэг!</p>
                        <p className='max-w-[372px] w-full text-white text-[18px] leading-[23px] text-opacity-80 mt-[30px]'>Дотоод, гадаадын шилдэг, шинэ мэдээллүүдийг нэг цэгээс хүргэнэ!</p>
                    </div>
                    <img className='w-[604px] h-[271px] hidden md:block' alt='' src={require('../../assets/images/help2x.png')} />
                </div>
            </div>
            <div className='max-w-[1310px] w-full flex flex-col sm:flex-row mt-[30px] sm:mt-[60px] justify-between mb-[87px] px-[16px] md:px-0'>
                <div style={{boxShadow: '0px 2px 2px #00000010'}} className={`w-[290px] bg-[#FFFFFF] border ${selected !== 1 && 'sm:sticky top-[60px]'} border-[#EFEEEF] h-[270px] rounded-[4px] p-[10px]`}>
                    {
                        Tabs.map((data, index) => {
                            return(
                                <div onClick={() => setSelected(index)} key={index} className={`flex flex-row items-center pl-[14px] cursor-pointer h-[50px] ${selected === index && 'bg-[#FF6600] bg-opacity-10 rounded-[2px]'}`}>
                                    <span className={`${data.icon} w-[22px] h-[22px] text-[20px] flex justify-center items-center ${selected === index ? 'text-[#FF6600]' : 'text-[#909090]'}`} />
                                    <p className={`ml-[10px] text-[16px] leading-[19px] ${selected === index ? 'text-[#FF6600] font-medium' : 'text-[#111111]'}`}>{data.name}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='max-w-[960px] w-full'>
                    {
                        selected === 0
                        ?
                        <div>
                            <p className='font-condensed font-bold text-[32px] text-[#111111] leading-[38px] mt-[20px] sm:mt-0'>Бидний тухай</p>
                            <div className='flex flex-col justify-between mt-[20px] text-[#555555]'>
                                <p className='text-[15px] leading-[20px]'>Саак.мн сайт нь 2006 оны 1-р сарын 23-аас эхэлж үйл ажиллагаагаа явуулж эхэлсэн бөгөөд Гадаад дотоодын сонин содон, сонирхолтой баримт, гэрэл зургуудыг хүргэсээр ирсэн Монголын анхны энтертаймент сайт билээ.</p>
                                <p className='text-[#555555] text-[15px] font-bold leading-[22px] mt-[10px]'>Өөрчлөлт шинэчлэлт:</p>
                                <ul>
                                    <li>- Гадаад дотоодын шилдэг, шинэ мэдээллүүдийг нэг цэгээс хүргэх суваг болов</li>
                                    <li>- Та бүртгүүлээд өөрийн сонирхолын дагуу мэдээллээ авах боломжтой болсон</li>
                                </ul>
                            </div>
                            <p className='text-[#363946] text-[20px] font-bold leading-[24px] mt-[40px]'>Манай үйлчилгээнүүд</p>
                            <div className='flex flex-wrap justify-center gap-[21px] mt-[20px]'>
                                {
                                    caakNames.map((data, index) => {
                                        return(
                                            index !== 2 ?
                                            <a href={data.url} target="_blank" key={index} style={{boxShadow: '0px 2px 2px #0000000F'}} className='w-[306px] h-[226px] flex flex-col items-center justify-center bg-white rounded-[4px] border border-[#EFEEEF] px-[20px]'>
                                                <img src={data.image} alt=''/>
                                                <p className='text-[#909090] text-[16px] font-medium leading-[19px] mt-[20px]'>{data.name}</p>
                                                <p className='text-[#555555] text-[15px] leading-[19px] mt-[20px] text-center'>{data.desc}</p>
                                            </a>
                                            :
                                            <a href={data.url} target="popup" key={index} style={{boxShadow: '0px 2px 2px #0000000F'}} className='w-[306px] h-[226px] flex flex-col items-center justify-center bg-white rounded-[4px] border border-[#EFEEEF] px-[20px]'>
                                                <img src={data.image} alt=''/>
                                                <p className='text-[#909090] text-[16px] font-medium leading-[19px] mt-[20px]'>{data.name}</p>
                                                <p className='text-[#555555] text-[15px] leading-[19px] mt-[20px] text-center'>{data.desc}</p>
                                            </a>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        :
                        selected === 1
                        ?
                        <div>
                            <p className='font-condensed font-bold text-[25px] md:text-[32px] text-[#111111] md:leading-[38px] mt-[20px] sm:mt-0'>Сурталчилгаа байршуулах</p>
                            <p className='text-[15px] text-[#555555] leading-[20px] mt-[23px]'>Та манай 16 жилийн түүхтэй CAAK.MN сайт дээр Мэдээ, Пост, Контент нийтлүүлэх болон бизнесийн сурталчилгаа байршуулснаар дараах давуу талуудыг хүртэх боломжтой.</p>
                            <p className='text-[#363946] text-[20px] font-bold leading-[24px] mt-[40px]'>Давуу талууд</p>
                            <div className='flex flex-wrap justify-center sm:justify-between gap-[20px] mt-[20px]'>
                                {
                                    Reclam.map((data, index) => {
                                        return(
                                            <div key={index} style={{boxShadow: '0px 2px 2px #0000000F', backgroundColor: data.color}} className={`w-[306px] flex flex-col pt-[20px] pb-[14px] rounded-[4px] px-[20px]`}>
                                                <span style={{color: data.textColor}} className={`${data.icon} w-[20px] h-[20px] text-[18px] flex justify-center items-center`} />
                                                <p style={{color: data.textColor}} className='text-[15px] leading-[19px] mt-[8px] font-medium'>{data.title}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        :
                        selected === 2
                        ?
                        <div>
                            <p className='font-condensed font-bold text-[32px] text-[#111111] leading-[38px] mt-[20px] sm:mt-0'>Холбоо барих</p>
                            <div className={`flex flex-row items-center text-[#555555] mt-[20px]`}>
                                <span className={`icon-fi-rs-mail-o w-[24px] h-[24px] text-[22px] flex justify-center items-center`} />
                                <p className='ml-[10px] text-[15px] leading-[18px]'>marketing@caak.mn</p>
                            </div>
                            <div className={`flex flex-row items-center text-[#555555] mt-[20px]`}>
                                <span className={`icon-fi-rs-phone w-[24px] h-[24px] text-[14px] flex justify-center items-center`} />
                                <p className='ml-[10px] text-[15px] leading-[18px]'>99093445, 99108661</p>
                            </div>
                            <div className={`flex flex-row items-center text-[#555555] mt-[14px]`}>
                                <span className={`icon-fi-rs-location-o w-[24px] h-[24px] text-[22px] flex justify-center items-center`} />
                                <p className='ml-[10px] text-[15px] leading-[18px]'>Улаанбаатар, Хан-Уул дүүрэг, 17-р хороолол “Кинг тауэр”, 121/102</p>
                            </div>
                        </div>
                        :
                        selected === 3
                        ?
                        <div>
                            <p className='font-condensed font-bold text-[32px] text-[#111111] leading-[38px] mt-[20px] sm:mt-0'>Нууцлалын баталгаа</p>
                            <p className='mt-[20px] text-[15px] leading-[21px] text-[#555555]'>Caak.mn нь үйлчүүлэгчдийнхээ мэдээллийн нууцлалыг нэн тэргүүнд чухалчлан үзэж халдашгүй байдлыг бүхий л сүлжээний харилцаанд бүрэн хангадаг. Бид манайд харьяалагддаггүй бусад компани хувь хүмүүсийн үйлчилгээнд ямар нэгэн баталгаа өгөхгүй. Та манай цахим хуудсаар үйлчлүүлж манай үйлчлүүлэгч болох нь дараах нууцлалын баталгааг хүлээн зөвшөөрсний илрэл юм.</p>
                            {
                                security.map((data, index) => {
                                    return(
                                        <div className='mt-[40px]' key={index}>
                                            <p className='text-[#363946] text-[20px] font-bold leading-[24px]'>{data.name}</p>
                                            <p className='mt-[20px]'>{data.desc}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        :
                        selected === 4
                        ?
                        <div>
                            <p className='font-condensed font-bold text-[32px] text-[#111111] leading-[38px] mt-[20px] sm:mt-0'>Үйлчилгээний нѳхцѳл</p>
                            <ol className='mt-[20px]'>
                                <li className='text-[#363946] text-[20px] font-bold'>Ерөнхий зүйл
                                    <ol className='mt-[20px] text-[15px] text-[#555555] leading-[22px] font-normal'>    
                                        <li>Caak.mn сайтыг болон түүнд агуулагдаж байгаа бүх текст, фото, график, видео, дуу авианы контентуудыг бүхэлд нь "Саак Холдинг" ХХК хариуцдаг болно. Хэрэглэгч нь энэхүү журамд нийцүүлэн уг сайтыг хэрэглэх ёстой.Хэрвээ дурдсан нөхцлүүдийг зөвшөөрөхгүй бол сайтад хандах болон хэрэглэхээс татгалзахыг зөвлөж байна.</li>
                                        <li>Саак Холдинг" ХХК нь үйлчилгээний нөхцөлд хүссэн үедээ өөрчлөлт хийх бүрэн эрхтэй. Хийгдсэн өөрчлөлтүүд нь сайтад нийтлэгдсэн мөчөөс хүчин төгөлдөр үйлчилнэ. Хэрэглэгч нь нөхцөлд орсон өөрчлөлтийг нийтлэгдсэнээс хойш хэрэглэвэл хүлээн зөвшөөрсөнд тооцогдоно.</li>
                                        <li>Саак Холдинг" ХХК нь сайтын агуулга, үйлчилгээний бүтэц, хэлбэр загвар зэрэгт хүссэн үедээ, хүссэн өөрчлөлт шинэчлэлтээ хийх эрхтэй.</li>
                                    </ol>
                                </li>
                                <li className='text-[#363946] text-[20px] font-bold mt-[40px]'>Оюуны өмчлөл
                                    <ol className='mt-[20px] text-[15px] text-[#555555] leading-[22px] font-normal'>
                                        <li>Сайтад нийтлэгдсэн текст, дуу авиа, график зураг, лого, фото, видео болон бусад бүх контентуудын оюуны өмчлөл нь Монгол Улсын холбогдох хууль тогтоомжийн дагуу баталгаажсан болно.</li>
                                        <li>Сайтын аливаа контентыг хэрэглэгч нь зөвхөн хувийн хэрэгцээндээ ашиглах эрхтэй. “Саак Холдинг” ХХК-ийн зөвшөөрөлгүйгээр контентыг хувилж тараах, нийтлэх, арилжааны зорилгоор ашиглахыг хориглоно. </li>
                                        <li>Хэрэглэгч нь сайтын аливаа контентыг хуулж, татаж авснаар өмчлөх эрх шилжихгүй гэдгийг анхааруулж байна.</li>
                                    </ol>
                                </li>
                                <li className='text-[#363946] text-[20px] font-bold mt-[40px]'>Гуравдагч этгээдийн контент
                                    <ol className='mt-[20px] text-[15px] text-[#555555] leading-[22px] font-normal'>
                                        <li>Сайт нь гэрээний үндсэн дээр гуравдагч мэдээллийн эх үүсвэрийн контентыг нийтэлнэ.</li>
                                        <li>эдгээр контентууд нь тус тусын зохиогч, өмчлөгчтэй байх ба сайт нь гэрээний нөхцлөөс гадуур эзэмших эрхгүй.</li>
                                        <li>Гуравдагч этгээдийн контентод туссан санаа, үзэл бодол, үнэн зөв байдал, байр суурийн өмнөөс сайт нь хариуцлага хүлээхгүй. Хэрэглэгч нь эдгээр контентын үнэн зөв байдал, байр суурь зэрэгт хувийн үнэлэлт дүгнэлтээ өгөх үүрэгтэй.</li>
                                    </ol>
                                </li>
                                <li className='text-[#363946] text-[20px] font-bold mt-[40px]'>Сурталчилгаа
                                    <ol className='mt-[20px] text-[15px] text-[#555555] leading-[22px] font-normal'>
                                        <li>Сайт нь арилжааны зорилгоор сурталчилгаа байршуулах эрхтэй.</li>
                                        <li>Хэрэглэгч болон сурталчлагч байгууллагын хоорондын харилцаанд Сайт огт оролцохгүй ба үүнтэй холбоотой үүссэн аливаа маргаан, үл ойлголцолд Сайт хариуцлага хүлээхгүй.</li>
                                    </ol>
                                </li>
                                <li className='text-[#363946] text-[20px] font-bold mt-[40px]'>Барааны тэмдэгт
                                    <ol className='mt-[20px] text-[15px] text-[#555555] leading-[22px] font-normal'>
                                        <li>Сайтад нийтлэгдсэн “Саак Холдинг” ХХК-нд харъяалагдах бүх үйлчилгээ, бүтээгдэхүүний барааны тэмдэгт нь тус компаний өмчид тооцогдоно.</li>
                                        <li>Сайтад нийтлэгдсэн гуравдагч этгээдүүдийн барааны тэмдэгтүүд нь тус тусын эзэмшигчдийн өмчид тооцогдоно.</li>
                                    </ol>
                                </li>
                                <li className='text-[#363946] text-[20px] font-bold mt-[40px]'>Шинэчлэл
                                    <ol className='mt-[20px] text-[15px] text-[#555555] leading-[22px] font-normal'>
                                        <li>Энэхүү үйлчилгээний нөхцөл нь 2016 оны 02-р сард сарын 15-нд шинэчлэгдсэн болно.</li>
                                    </ol>
                                </li>
                            </ol>
                        </div>
                        :
                        null
                    }
                </div>
            </div>
            {
                selected === 1 
                &&
                <div className='bg-white pt-[50px] flex justify-center w-full px-[16px] md:px-0'>
                    <div className='max-w-[1310px] w-full flex flex-col items-center'>
                        <div style={{boxShadow: '0px 3px 8px #0000001A'}} className='w-full h-[68px] border border-[#D4D8D8] flex flex-row justify-center items-center rounded-[4px]'>
                            <div className='flex flex-col sm:flex-row items-center'>
                                <span className='w-[32px] h-[32px] flex justify-center items-center rounded-full bg-caak-primary text-white icon-fi-rs-mail-o text-[18px]' />
                                <p className='sm:ml-[16px] text-[15px] leading-[18px] text-caak-black'>marketing@caak.mn</p>
                            </div>
                            <div className='flex flex-col sm:flex-row items-center ml-[30px]'>
                                <span className='w-[32px] h-[32px] flex justify-center items-center rounded-full bg-caak-primary text-white icon-fi-rs-phone text-[17px]' />
                                <p className='ml-[10px] text-[15px] leading-[18px] text-caak-black'>99093445, 99108661</p>
                            </div>
                        </div>
                        <p className='mt-[40px] font-condensed font-bold text-[38px] leading-[44px]'>Баннер байршуулах</p>
                        {/* <p className='text-caak-primary text-[18px] leading-[21px] mt-[12px] w-full text-center'>/ Үнэ өдрөөр /</p> */}
                        <div className='mt-[30px] flex flex-wrap justify-center gap-[23px] w-full'>
                            {
                                caakAds.map((data, index) => {
                                    return(
                                        <div onMouseEnter={() => toggleHover(index)} onMouseLeave={() => setHovered(false)} key={index} style={{boxShadow: hovered === index ? '0px 2px 16px #00000033' : '0px 2px 2px #0000000F'}} className='w-full sm:w-[310px] h-[304px] border border-[#D4D8D8] rounded-[4px] p-[20px] flex flex-col justify-between'>
                                            <div>
                                                <p className='w-[40px] h-[40px] rounded-[2px] bg-caak-primary bg-opacity-10 flex justify-center items-center text-caak-primary text-[22px] font-bold leading-[25px]'>{data.pos}</p>
                                                <p className='text-[20px] leading-[24px] mt-[18px]'>{data.size}</p>
                                                <p className='text-caak-darkGray mt-[4px] text-[15px] leading-[18px]'>Хэмжээ</p>
                                                <p className='text-caak-darkGray text-[15px] leading-[19px] mt-[14px]'>{data.desc}</p>
                                            </div>
                                            <button onClick={() => setOpen(data.pos)} className='bg-[#3B4491] text-white text-[16px] font-medium w-full h-[44px] rounded-[4px]'>
                                                Жишээ үзэх
                                            </button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <span className='w-full h-[7px] bg-[#F5F5F5] mt-[50px]' />
                        <p className='text-[38px] font-condensed font-bold leading-[44px] mt-[50px]'>Тѳлбѳртэй мэдээ</p>
                        <p className='text-caak-primary text-[18px] leading-[21px] mt-[12px] w-full text-center'>/ Нэг удаа /</p>
                        <div className='flex flex-wrap justify-center gap-[28px] w-full mt-[31px]'>
                            {
                                moneyNews.map((data, index) => {
                                    return(
                                        <div onMouseEnter={() => toggleHoverNews(index)} onMouseLeave={() => setHoveredNews(false)} key={index} style={{boxShadow: hoveredNews === index ? '0px 2px 16px #00000033' : '0px 2px 2px #0000000F'}} className='w-full sm:w-[418px] h-[316px] border border-[#D4D8D8] rounded-[4px]'>
                                            <div className='w-full h-[113px] relative rounded-t-[4px]'>
                                                <img alt='' src={data.pic} className='w-full h-full object-cover' />
                                                <p className='bg-black bg-opacity-30 h-full w-full text-white text-[20px] font-bold absolute top-0 flex justify-center items-center'>{data.pos}</p>
                                            </div>
                                            <div className='flex flex-col justify-between h-[203px] p-[20px]'>
                                                <p className='text-caak-darkGray text-[15px] leading-[20px]'>{data.desc}</p>
                                                <button className='bg-[#363946] text-white text-[16px] font-medium w-full h-[44px] rounded-[4px]'>
                                                    Жишээ үзэх
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='w-full mt-[50px] pb-[100px]'>
                            <div className='text-[#F53757] flex flex-row items-center'>
                                <span className='icon-fi-rs-info w-[24px] h-[24px] flex flex-row items-center text-[22px]' />
                                <p className='ml-[6px] font-bold text-[16px]'>Анхаарах зүйлс:</p>
                            </div>
                            <ul className='list-disc list-inside text-caak-darkGray mt-[22px]'>
                                <li>Эдгээр үнэнд НӨАТ орсон болно!</li>
                                <li>Сурталчилгааны агуулга нь Монгол Улсын хууль журмыг зөрчөөгүй байх </li>
                                <li>Зар, сурталчилгааны үнэн, бодит байдлыг зарлуулагч байгууллага хариуцна</li>
                                <li> Баннер солигдох бөгөөд нэг байршилд 4-өөс дээш баннер солигдохгүй </li>
                                <li>Улс төрийн агуулгатай, шууд болон шууд бус сурталчилгаанд энэ үнийг мөрдөхгүй</li>
                            </ul>
                        </div>
                    </div>
                    <BannerModal setOpen={setOpen} open={open} />
                </div>
            }
            {/* {
                ((selected === 1) || (selected === 2)) &&
                <div className='w-full h-[276px] hidden bg-[#FF6600] md:flex justify-center'> 
                    <div className='max-w-[1310px] w-full flex flex-col sm:flex-row sm:items-center px-[16px] sm:px-0 pt-[20px] sm:pt-0'>
                        <p className='text-[#F5F5F5] font-medium text-[30px] leading-[40px] sm:text-[48px] sm:leading-[59px] max-w-[645px]'>Өөрийн мэдээг үнэ цэнэтэй болгомоор байна уу?</p>
                        <div onClick={() => setSelected(2)} className='w-[280px] cursor-pointer h-[64px] bg-white flex flex-row items-center justify-center rounded-[4px] mt-[20px] sm:mt-0 sm:ml-[210px]'>
                            <p className='text-[20px] text-[#111111] font-medium'>Холбоо барих</p>
                            <span className='icon-fi-rs-down-chevron -rotate-90 text-[20px] ml-[20px] w-[24px] h-[24px] flex justify-center items-center' />
                        </div>
                    </div>
                </div>
            } */}
        </div>
    );
}
