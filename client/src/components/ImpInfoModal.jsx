import "../styles/modal.css"


function ImpInfoModal(props) {
    const { show, setShow } = props
    return (
        <>
            <div className='modalBg bg-local  top-0 flex items-center z-[99] left-0 bottom-full bg-slate-200 w-screen absolute border-y-2 border-black'>
                <div className='w-5/6 flex-col shadow-lg h-80 overflow-scroll bg-white mx-auto p-2 rounded border-2 border-black mb-96'>
                    <div className='flex flex-col w-full mb-2 items-center'>

                        <h1 className='text-2xl mb-2 items-center'><strong>Important Info</strong></h1>
                        <h6 className="text-sm">*Please Read Thoroughly*</h6>
                    </div>
                    <div className='content'>
                        <p className='mb-2'><strong>Important Dates:</strong></p>
                        <p className='mb-1'><strong>Start:</strong> Jan 3rd - May 14th, 2023</p>
                        <p className='mb-1'><strong> Show date: </strong>May 14th, 2023 at The San Rafael Community center!</p>
                        <p className='mb-1'><strong>MANDATORY TECH: </strong> 2-4pm</p>
                        <p className='mb-1'><strong> Spring Mother's Day Show:</strong> 4-6pm</p>
                        <p className='mb-1'><strong>No</strong> Class Jan 2nd</p>
                        <p className='mb-1'><strong>No</strong> Class Jan 16th MLK Day</p>
                        <p className='mb-1'><strong>No</strong> Class Feb 20-24th Mid Winter Break</p>
                        <p className='mb-1'><strong>No</strong> Class April 10-14 Spring Break</p>
                    </div>


                    <div className='flex flex-col w-full mb-2 items-center'>
                        <h1 className='text-2xl my-2 items-center'><strong>Tuition:</strong></h1>
                    </div>
                    <div className='content flex flex-col items-center'>
                        <p className='mb-2'><strong>Tuition includes all classes plus costume, photos and recital.</strong></p>
                        
                        <p className='mb-1'><strong> All tuition is due first week of classes or else subject to $25 late fee.  </strong></p>

                    </div>


                    <div className='flex flex-col w-full mb-2 items-center'>
                        <h1 className='text-2xl my-2 items-center'><strong>BUDA Crew Competition Info:</strong></h1>
                    </div>
                    <div className='content'>
                        <p className='mb-1'><strong>BUDA Competition Crew Important Dates: </strong> March 17-19th Have all weekend free. We will be competing at Monsters Dance Convention in Santa Clara. Mandatory Rehearsals: March 1st, 8th, and 15th. </p>
    

                    </div>

                    <div className='flex flex-col w-full mb-2 items-center'>
                        <h1 className='text-2xl my-2 items-center '><strong>Contact:</strong></h1>
                    </div>
                    <div className='content flex'>
                        <p className='mb-2 flex mx-auto'>Please contact Bianca Zogbi at Biancazdancing@gmail.com if you have any questions. </p>
                    </div>


                    <div className='flex flex-col w-full mb-2 items-center'>
                        <h1 className='text-2xl mb-2 items-center'><strong>Location</strong></h1>
                    </div>
                    <div className='flex flex-col items-center'>
                        <p className='mb-2 '><strong>Studio located at 167 Tunstead Ave, San Anselmo, CA </strong></p>
                        <p>Thank you for choosing to dance at BUDA! Can't wait to dance with you!</p>
                    </div>


                    <div className='w-full flex justify-center mt-3'>
                        <button className='bg-indigo-600 px-4  text-white rounded  hover:bg-slate-900 hover:text-pink-300 transition-all duration-500' onClick={() => setShow(false)}>close</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ImpInfoModal;