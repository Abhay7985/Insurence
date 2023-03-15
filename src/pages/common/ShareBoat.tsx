import { Button, ConfigProvider, Modal } from 'antd'
// import Image from 'next/image'
import { useContext, useState } from 'react';
import BoatImage from '../../assets/images/boat_one.png';
import HenceforthIcons from '../../assets/icons/HenceforthIcons';
import { GlobalContext } from '../../context/Provider';
import henceforthApi from '../../utils/henceforthApi';
import { useLocation, useMatch } from 'react-router-dom';
const ShareBoat = (state: any) => {
    const [modal2Open, setModal2Open] = useState(false);
    const { Toast } = useContext(GlobalContext)
    const match=useMatch("")
    const location = useLocation()
    const copyText = (id: string, name: string) => {
        if (id) {
            navigator?.clipboard?.writeText(id)
            Toast.success(`${name} copied`)
        }
    }
    return (
        <>
            <ConfigProvider>
                {/* <Button type="primary" onClick={() => setModal2Open(true)}>
                    Vertically centered modal dialog
                </Button> */}
                <button className="btn border-0 p-0" onClick={() => setModal2Open(true)}>
                    <HenceforthIcons.Share />
                    <span role="button" className='text-decoration-none'> Share</span>
                </button>
                <Modal
                    // title="Vertically centered modal dialog"
                    centered
                    open={modal2Open}
                    onOk={() => setModal2Open(false)}
                    onCancel={() => setModal2Open(false)}
                    footer={false}
                >
                    <div className="boat-sharing px-4 py-2">
                        <div className="row gy-3">
                            {/* heading */}
                            <div className="col-12">
                                <h3>Share this Boat</h3>
                            </div>
                            {/* content */}
                            <div className="col-12 py-2">
                                <div className="share-boat d-flex align-items-center gap-3">
                                    <div className="share-boat-image">
                                        <img src={state.cover_image ? `${henceforthApi.API_FILE_ROOT_ORIGINAL}${state.cover_image}` : ""} alt="img" className='img-fluid' />
                                        {/* <img src={BoatImage} alt='img' className='img-fluid' /> */}
                                    </div>
                                    <div className="share-boat-desc">
                                        <p>{state.name}</p>
                                    </div>
                                </div>
                            </div>
                            {/* Share link */}
                            <div className="col-md-6">
                                <div className="social-button">
                                    <button className='btn w-100 py-3 text-start' onClick={() => copyText(`${window.location.origin}/${state.id}`, "Link")}>
                                        <HenceforthIcons.ShareCopy />
                                        <span className='ms-2'>Copy Link</span>
                                    </button>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="social-button">
                                    <a href={`mailto:info@example.com?subject=lanchasalvador&body=https://${typeof window !== "undefined" ? window?.location?.origin : ''}${window.location.pathname}:`} target="_blank" className='btn w-100 py-3 text-start'>
                                        <HenceforthIcons.ShareGmail />
                                        <span className='ms-2'>Email</span>
                                    </a>
                                </div>
                            </div>
                            {/* <div className="col-md-6">
                                <div className="social-button">
                                    <button className='btn w-100 py-3 text-start'>
                                        <HenceforthIcons.ShareMessage />
                                        <span className='ms-2'>Messages</span>
                                    </button>
                                </div>
                            </div> */}
                            <div className="col-md-6">
                                <div className="social-button">
                                    <a onClick={() => typeof window !== "undefined" ? (window as any).open(`https://wa.me/918602681564?text=Checkout this Boat on Lancha-salvador : ${`${typeof window !== "undefined" ? window?.location?.origin : ''}${window.location.pathname}`}`) : ""} className='btn w-100 py-3 text-start'>
                                        <HenceforthIcons.ShareWhatsApp />
                                        <span className='ms-2'>WhatsApp</span>
                                    </a>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="social-button">
                                    <a href={`http://www.facebook.com/dialog/send?app_id=513057044091772&link=https://aluguel.provider.lanchasalvador.com.br${window.location.pathname}&redirect_uri=${typeof window !== "undefined" ? window?.location?.origin :""}${window.location.pathname}`} target="_blank" className='btn w-100 py-3 text-start'>
                                        <HenceforthIcons.ShareMessenger />
                                        <span className='ms-2'>Messenger</span>
                                    </a>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="social-button">
                                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${typeof window !== "undefined" ? window?.location?.origin : ''}${window.location.pathname}`} target="_blank" className='btn w-100 py-3 text-start'>
                                        <HenceforthIcons.ShareFacebook />
                                        <span className='ms-2'>Facebook</span>
                                    </a>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="social-button">
                                    <a href={`https://www.twitter.com/share?url=https://${typeof window !== "undefined" ? window?.location?.origin : ''}${window.location.pathname}`} target="_blank" className='btn w-100 py-3 text-start'>
                                        <HenceforthIcons.ShareTwitter />
                                        <span className='ms-2'>Twitter</span>
                                    </a>
                                </div>
                            </div>
                            {/* <div className="col-md-6">
                                <div className="social-button">
                                    <button className='btn w-100 py-3 text-start'>
                                    <HenceforthIcons.ShareCopy/>
                                        <span>Embed</span>
                                    </button>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="social-button">
                                    <button className='btn w-100 py-3 text-start'>
                                        <span>More options</span>
                                    </button>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </Modal>
            </ConfigProvider>
        </>
    )
}
export default ShareBoat