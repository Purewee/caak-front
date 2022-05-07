import useAddPostLayout from '../../../../src/hooks/usePostViewLayout'
import React, {useState, useEffect, useContext} from 'react'
import { ESService } from '../../../../src/lib/esService'
import { AppContext } from '../../../App'

const Post = () => {
    const [news, setNews] = useState();
	const context = useContext(AppContext);

    useEffect(() => {
        context.setStore('default')
    },[])

    useEffect(() => {
      const es = new ESService('caak');
      
    }, []);
  
    const Layout = useAddPostLayout();
    return(
        <Layout>
            <div className='pt-[81px] flex flex-col items-center max-w-[960px] w-full'>
                <p className='text-[#FF6600] text-[13px] font-medium'>#ХӨГЖИМ</p>
                <p className='text-[#111111] text-[38px] mt-[20px]'></p>
                <div className='flex flex-row justify-between w-full h-[32px] mt-[30px]'>
                    <div className='flex flex-row items-center'>
                        <img alt='' className='w-[20px] h-[20px] rounded-full' src='https://scontent.fuln2-2.fna.fbcdn.net/v/t1.18169-9/16388375_1258991760846780_6001512035944932012_n.png?_nc_cat=107&ccb=1-5&_nc_sid=174925&_nc_ohc=9pNL5ldMQ0kAX9pezvA&_nc_ht=scontent.fuln2-2.fna&oh=00_AT_EajREYn111vXVkurvpyOYzjTeuOzuFyv0-fQvIPkcCQ&oe=6298F67B'/>
                        <p className='ml-[6px] text-[#555555] text-[15px]'>Gogo.mn</p>&nbsp;&middot;&nbsp;
                        <p className='text-[#555555] text-[14px]'>Чулуунбат</p>
                        <p className='ml-[12px] text-[#909090] text-[13px]'>2022.04.28, 22:05</p>
                    </div>
                    <div className='flex flex-row items-center'>
                        <span className="icon-fi-rs-fb cursor-pointer text-[#909090] text-[20px]"/>
                        <span className="icon-fi-rs-tw cursor-pointer text-[#909090] text-[20px] ml-[24px]"/>
                        <span className="icon-fi-rs-bookmark cursor-pointer text-[#909090] text-[17px] ml-[25px]"/>
                    </div>
                </div>
                <img style={{border: '1px solid #707070'}} alt='' className='w-full h-[530px] mt-[30px] object-cover'/>
                <p className='text-[#555555] text-[18px] max-w-[760px] mt-[60px]'>Урлагийн ертөнцөд хөл тавьсан цагаас эхлэн өнөөг хүртэлх 26 жилийн хугацаанд хийсэн бүхнээрээ салбартаа чичиргээн үүсгэж, тасралтгүй шинэ босго, стандартыг тогтоосоор ирсэн нэгэн бол дуучин Д.Болд. “Камертон” хамтлагийг үүсгэн байгуулснаасаа хойш шил шилээ дарсан супер хит дуунуудаар залуусыг байлдан дагуулж, үргэлжлүүлэн соло уран бүтээлүүдээрээ энтертайнмент салбарт хурцаар гэрэлтсээр буй тэрээр сүүлийн жилүүдэд “B Production” болон “Voice Mongolia” шоугаар дамжуулан зөвхөн өөрийн уран бүтээлээс гадна залуу уран бүтээлчдийг дэмжих чиглэлд анхаарал хандуулах болсныг бид мэднэ. Манай “Би хэрхэн ажилладаг вэ?” буланд урих зочдын санал асуулгыг бүх цаг үед тэргүүлсээр ирсэн түүнийг бид Монгол Улсад анхны олон улсын стандартад нийцсэн, А зэрэглэлийн мэргэжлийн дуу бичлэгийн “440Hz Records” студийнхээ үйл ажиллагааг эхлүүлээд буй энэ цаг үед ярилцлагын буландаа урьсан билээ.</p>
                <div className='flex flex-row w-full mt-[82px]'>
                    <p className='text-[14px] leading-[16px] text-[#111111] py-[7px] px-[12px] border border-[#D4D8D8] rounded-[3px]'>#Улс төр</p>
                </div>
                <div>

                </div>
                <div className='flex flex-row mt-[38px] justify-between w-full border-t py-[17px] border-b border-[#EFEEEF]'>
                    <div className='flex flex-row items-center'>
                        <img alt='' className='w-[36px] h-[36px] rounded-full' src='https://scontent.fuln2-2.fna.fbcdn.net/v/t1.18169-9/16388375_1258991760846780_6001512035944932012_n.png?_nc_cat=107&ccb=1-5&_nc_sid=174925&_nc_ohc=9pNL5ldMQ0kAX9pezvA&_nc_ht=scontent.fuln2-2.fna&oh=00_AT_EajREYn111vXVkurvpyOYzjTeuOzuFyv0-fQvIPkcCQ&oe=6298F67B'/>
                        <p className='ml-[8px] text-[#555555] text-[15px]'>Gogo.mn</p>&nbsp;&middot;&nbsp;
                        <p className='text-[#555555] text-[14px]'>Чулуунбат</p>
                        <p className='ml-[12px] text-[#909090] text-[13px]'>2022.04.28, 22:05</p>
                    </div>
                    <button className="bg-caak-primary rounded-[4px] text-white font-bold text-[15px] w-[90px] h-[34px]">
                        Дагах
                    </button>
                </div>
                <p className='text-[#111111] text-[18px] font-bold leading-[21px] mt-[50px]'>ЭНЭ МЭДЭЭНД ӨГӨХ ТАНЫ СЭТГЭГДЭЛ?</p>
                <div className='max-w-[490px] w-full mt-[40px]'>
                    <div className='border h-[189px] w-full border-[#EFEEEF]'>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Post