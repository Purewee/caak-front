import { Link } from "react-router-dom"
export default function MagazineItem({data}) {
    return (
        <div className='min-w-[348px] max-w-[346px] h-[233px] relative'>
            <div className='absolute bg-white z-20 top-0 left-0 w-[340px] h-[227px] rounded-[4px] border-[1px] border-[#D4D8D8]'>
                <Link to={{pathname: `/magazine/${data.id}`}}>
                    <img alt="" src={'https://www.nme.com/wp-content/uploads/2021/02/iu-lilac-photo-edam-entertainment@2000x1270.jpg'} className='w-full object-cover h-[89px] rounded-t-[4px]'/>
                </Link>
                <div className='px-[16px] pt-[8px]'>
                    <p className='text-[#111111] text-[18px] font-medium truncate-1'>{data.title}</p>
                        <p className='text-[15px] text-[#909090] truncate-2 leading-[19px]'>Энэхүү жор дээр технологи болон иноваци тухай мэдээнүүдийг оруулах болно.</p>
                    <div className='flex flex-row items-center w-full justify-between mt-[12px]'>
                        <div className='flex flex-row items-center'>
                            <img src='https://cdn.i-scmp.com/sites/default/files/styles/og_twitter_scmp_analysis/public/d8/images/methode/2020/06/08/4b0bdfc6-a639-11ea-8ea0-d7434be00753_image_hires_121748.jpg?itok=pAUflAeJ&v=1591589877' alt='' className='rounded-full w-[22px] h-[22px]' />
                            <p className='text-black text-[15px] font-medium ml-[6px]'>{data.user.nickname}</p>
                        </div>
                        <button className='text-[#FF6600] rounded-[4px] border border-[#FF6600] py-[8px] px-[24px] text-[15px] font-medium'>
                            Дагах
                        </button>
                    </div>
                </div>
            </div>
            <div className='absolute bg-white z-10 top-[5px] left-[5px] w-[338px] h-[225px] rounded-[4px] border-[1px] border-[#D4D8D8]'>

            </div>
            <div className='absolute z-0 bg-white top-[10px] left-[10px] w-[336px] h-[223px] rounded-[4px] border-[1px] border-[#D4D8D8]'>

            </div>
        </div>
    )
}
