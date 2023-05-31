import bPhoto from "../assets/images/budaLogo.png"

const InstructorsPage = () => {
    return (
        <div className="mb-8">
            <div className="w-full flex justify-center h-[100px] items-center">
                <h1 className="welcome text-2xl">B.U.D.A. Instructors</h1>
            </div>


            <div className="w-full flex h-content items-center py-3 px-1 justify-center justify-evenly bg-slate-100 mb-10">
                <div>
                    <img src={bPhoto} />
                </div>

                <div className="w-1/2 flex flex-col ">
                    <h1 className="mx-auto welcome my-2">Bianca Zogbi</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        In hac habitasse platea dictumst quisque sagittis. Tellus rutrum tellus pellentesque eu tincidunt tortor.
                        Nunc sed blandit libero volutpat sed cras ornare arcu.
                    </p>
                </div>
            </div>


            <div className="w-full flex h-content py-3 px-1 items-center justify-center justify-evenly bg-slate-200 mb-10">

                <div className="w-1/2 flex flex-col">
                    <h1 className="mx-auto welcome my-2">Ben Donner</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        In hac habitasse platea dictumst quisque sagittis. Tellus rutrum tellus pellentesque eu tincidunt tortor.
                        Nunc sed blandit libero volutpat sed cras ornare arcu.
                    </p>
                </div>
                <div>
                    <img src={bPhoto} />
                </div>
            </div>
            <div className="w-full flex py-3 px-1 h-content items-center justify-center justify-evenly bg-slate-100">
                <div>
                    <img src={bPhoto} />
                </div>

                <div className="w-1/2 flex flex-col ">
                    <h1 className="mx-auto welcome my-2">Jazzy</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        In hac habitasse platea dictumst quisque sagittis. Tellus rutrum tellus pellentesque eu tincidunt tortor.
                        Nunc sed blandit libero volutpat sed cras ornare arcu.
                    </p>
                </div>
            </div>


        </div>
    )
}

export default InstructorsPage;