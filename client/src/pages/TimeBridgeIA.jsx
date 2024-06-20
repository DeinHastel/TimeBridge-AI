import '../normal.css'
import '../App.css';
import { useRef, useState, useEffect } from "react"
import TimeLogo from '../assets/chatgptLogo.jpeg';
import AggBtn from '../assets/add-30.png';
import MsgIcon from '../assets/message.svg';
import Casa from '../assets/home.svg';
import Cohete from '../assets/rocket.svg';
import EnviarBtn from '../assets/send.svg';
import IconoUsuario from '../assets/user-icon.png';
import ChatgptLogo from '../assets/chatgptLogo.jpeg';
import { sendMsgToOpenAI } from '../api/openai';
import Modal from '../components/Modal';
import { getChats } from "../api/chat.api"

export function TimeBridgeIA () {
    const msgEnd = useRef(null);
 
    const [input, setInput] = useState("");
    const [messages, setMessages ] = useState([
      {
        text: "Hi, I am TimeBridgeAI",
        isBot: true,
      }
  ]);
  
    const [chats, setChats] = useState([]);
    
    useEffect(()=>{

    async function loadChats() {
        //el userId es donde debe ir el id del usuario de la session
        const userId = 9
        const res = await  getChats(userId)
        
        setChats(res.data)
        
        console.log(res)
        
      }
      loadChats();


      msgEnd.current.scrollIntoView();
    },[messages]);

    const handleSend = async () => {
      const text = input;
      setInput('');
      setMessages([
        ...messages,
        {text, isBot:false}
      ])
      const response = await sendMsgToOpenAI(text); // Usar la variable de estado 'input'
      setMessages([
        ...messages,
        {text: text, isBot: false},
        {text : response, isBot : true}
      
      ]);
    }

    const handleEnter = async (e) => {
      if(e.key=='Enter') await handleSend();

    }
    const [open, setOpen] = useState(false);
    const [imagenModal, setImagenModal] = useState(null);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    const handleClick = (imagen, title, content) => {
      setImagenModal(imagen);
      setModalTitle(title);
      setModalContent(content);
      setOpen(true);
    };
    return (

        <div className='App'>
        <div className='menucostado'>
          <div className="arribaCostado">
            <div className="arribaCostadoEncima"><img src={TimeLogo} alt="Logo" className="logo" /><span className="marca">TimeBridgeAI</span></div>
            <button className="botonMedio" onClick={()=>{window.location.reload()}}><img src={AggBtn} alt="" className="botonAgg" />Nuevo chat</button>
            <div className="arribaCostadoDebajo">

              {chats.map(task => (
                <button className="query"><img src={MsgIcon} alt="Query" className="" />{task.titulo}</button>
                ))}
                

          
            </div>

          </div>
          <div className="abajoCostado">
          <button className="listaItems" onClick={() => handleClick(Casa, "",{
              content: (
                <div>
                  <h3 className="text-white text-2xl font-semibold"> Informacion del usuario</h3>
                  <br />
                  {/* Aqui pondremos la informacion del usuario */}
                    <div class="bg-gray-700 overflow-hidden shadow rounded-lg border">
                      
                      <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
                          <dl class="sm:divide-y sm:divide-gray-200">
                              <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                  <dt class="text-xl font-medium text-white">
                                      Full name
                                  </dt>
                                  <dd class="mt-1 text-xl text-white sm:mt-0 sm:col-span-2">
                                      John Doe
                                  </dd>
                              </div>
                              <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                  <dt class="text-xl font-medium text-white">
                                      Email address
                                  </dt>
                                  <dd class="mt-1 text-xl text-white sm:mt-0 sm:col-span-2">
                                      johndoe@example.com
                                  </dd>
                              </div>
                              <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                  <dt class="text-xl font-medium text-white">
                                      Phone number
                                  </dt>
                                  <dd class="mt-1 text-xl text-white sm:mt-0 sm:col-span-2">
                                      (123) 456-7890
                                  </dd>
                              </div>
                              <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                  <dt class="text-xl font-medium text-white">
                                      Address
                                  </dt>
                                  <dd class="mt-1 text-xl text-white sm:mt-0 sm:col-span-2">
                                      123 Main St
                                      Anytown, USA 12345
                                  </dd>
                              </div>
                          </dl>
                      </div>
                  </div>
                </div>
              )
            })}>
              <img src={Casa} alt="" className="listaItemsImg" />Perfil
          </button>

          <button className="listaItems" onClick={() => handleClick(Cohete, "",{
              content: (
                <div>
                  <h3 className="text-white text-2xl font-semibold">Mejora a Pro</h3>
                  <p className='parrafoModal'>Valor en dinero colombiano: XXXX</p>
                  <button onClick={() => setOpen(true)} className='bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded'>Comprar</button>
                </div>
              )
            })}>
              <img src={Cohete} alt="" className="listaItemsImg" />Mejora a pro
          </button>
          <Modal open={open} onClose={() => setOpen(false)} title={modalTitle} >
              <div className='text-center w-560'>

              {imagenModal && <img src={imagenModal} alt="" className="mx-auto text-white imagenModal" />}
                <div className='mx-auto my-4 w-3000'>
              
              {modalContent && (
                  <>
                      <h3 className="text-white text-xl font-semibold">{modalContent.title}</h3>
                      {modalContent.content}
                  </>
              )}
      
                </div>
              </div>

            </Modal>
          </div>
        </div>
        <div className="principal">
          <div className="chats text-xl font-medium">
            {messages.map((message, i) => 
              <div key={i} className={message.isBot?"chat bot":"chat"}>
                <img className='chatImg' src={message.isBot?ChatgptLogo:IconoUsuario} alt="" /><p className="txt">{message.text}</p>
              </div>
            )}
            <div ref={msgEnd}/>  

          </div>
          <div className="chatFooter">
            <div className="inp">
              <input className='text-xl font-medium' type="text" placeholder='Envia un mensaje...' value={input} onKeyDown={handleEnter} onChange={(e)=>{setInput(e.target.value)}}/> <button className="envio" onClick={handleSend}><img src={EnviarBtn} alt="Envio" /></button>
            </div>
            <p className='text-sm font-semibold'>Puede generar informacion inadecuada Agosto 20</p>
          </div>

        </div>
      </div>
      
    );
}

export default TimeBridgeIA;
