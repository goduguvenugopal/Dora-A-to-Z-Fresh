import React from 'react'
import { FaDownload, FaShareSquare } from 'react-icons/fa'


const InstallApp = () => {
    // share app function 
    const shareApp = async () => {
        try {
            await navigator.share(({
                text: "Dora A to Z Fresh - Your one-stop shop for fresh milk, groceries, and all your needs, delivered to your doorstep with quality assurance. Shop now! :",
                url: "https://doraatozfresh.vercel.app"
            }))
        } catch (error) {
            console.error(error);

        }
    }

    return (
        <>
            {/* download share app section  */}
            <section section className="container  px-5 py-10 mx-auto flex items-center md:flex-row flex-col bg-gray-700" >
                <div className="flex flex-col md:pr-10 md:mb-0 mb-6 pr-0 w-full md:w-auto md:text-left text-center">
                    <h2 className="text-xs text-orange-300 tracking-widest font-medium title-font mb-1">
                        Dora A to Z Fresh
                    </h2>
                    <h1 className=" text-md font-medium title-font text-white">
                        Download our app for a better experience! Get faster access, exclusive features, and more.

                    </h1>
                </div>
                <div className="flex items-center flex-wrap justify-center gap-3 w-full">
                    <a href='/Dora A to Z Fresh.apk' download="Dora A to Z Fresh.apk" className="bg-gray-100 text-center h-10 inline-flex gap-2 text-black py-2 px-5 rounded-full items-center hover:bg-gray-200 focus:outline-none w-[11rem]">
                        <FaDownload

                            className="w-4 h-4"

                        />
                        <span className="title-font font-medium">Download App</span>

                    </a>
                    <button onClick={shareApp} className='bg-blue-600 text-white flex items-center justify-center gap-2 font-semibold h-10 rounded-full w-[11rem]'>

                        <FaShareSquare className=' text-white' />Share App
                    </button>

                </div>
            </section>
        </>

    )
}

export default InstallApp