
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
import { sendMsgToBackend, sendMsgToOpenAI } from '../api/openai';
import Modal from '../components/Modal';
import { getChats, Insertarchats, deleteChat, updateChat } from "../api/chat.api";
import { infoUser } from '../api/userServicesInfo.api'
export function TimeBridgeIA () {
    const msgEnd = useRef(null);
    const [input, setInput] = useState("");
    const [messages, setMessages ] = useState([
      {
        text: "Hi, I am TimeBridgeAI",
        isBot: "bot",
      }
    ]);

    const [selectedChat, setSelectedChat] = useState(null); // Estado para el chat seleccionado
    const [chats, setChats] = useState([]);
    
    useEffect(() => {
      const fetchUserInfoAndChats = async () => {
        const token = localStorage.getItem("accessToken");
        if (token) {
          try {
            const config = {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };
    
            // Fetch user info
            const userResponse = await infoUser(config);
            setUserInfo(userResponse);
            console.log(userResponse);
    
            // Fetch chats after user info is loaded
            const userId = userResponse.id; // Usa el ID del usuario obtenido
            console.log(userId);
    
            const chatResponse = await getChats(userId);
            setChats(chatResponse.data);
            console.log(chatResponse);
          } catch (error) {
            console.error("Error fetching data", error);
          }
        }
      };
    
      fetchUserInfoAndChats();
    
      // Scroll to the end of the messages
      msgEnd.current.scrollIntoView();
    }, [selectedChat]);
    
    const handleSend = async () => {
      const text = input.trim(); // Eliminar espacios en blanco al inicio y al final
      if (text.length === 0) return; // No enviar mensajes vacíos
  
      setInput(''); // Limpiar el input después de obtener el texto
  
      if (selectedChat) {
          try {
              const response = await sendMsgToOpenAI(text);
              setMessages([
                  ...messages,
                  { text, isBot: "user" },
                  { text: response, isBot: "bot" }
              ]);
          } catch (error) {
              console.error('Error al enviar el mensaje:', error);
          }
      } else {
          const nuevoChat = {
              titulo: text.length > 30 ? text.substring(0, 30) : text, // Limitar el título a 30 caracteres
              id_usuario: userInfo.id, // Cambiar por el ID del usuario de la sesión
          };
  
          try {
              const res = await Insertarchats(nuevoChat);
              const createdChat = res.data;
            
              // Actualizar el estado de los chats y seleccionar el chat recién creado
              setChats([...chats, createdChat]);
              handleChatSelect(createdChat.id_chat);
  
              setMessages([
                  ...messages,
                  { text, isBot: false }
              ]);
  
              const response = await sendMsgToOpenAI(text);
              setMessages([
                  ...messages,
                  { text, isBot: "user" },
                  { text: response, isBot: "bot" }
              ]);
          } catch (error) {
              console.error('Error al crear y guardar el nuevo chat:', error);
          }
      }
  };
  const handleDeleteChat = async (chatId) => {
    const confirmed = window.confirm("¿Quieres borrar el chat?");
    if (!confirmed) return;

    try {
        await deleteChat(chatId);
        // Filtrar los chats para quitar el chat eliminado
        const updatedChats = chats.filter(chat => chat.id_chat !== chatId);
        setChats(updatedChats);
        // Si el chat seleccionado es el que se está eliminando, limpiar la selección
        if (selectedChat === chatId) {
            setSelectedChat(null);
            setMessages([{ text: "Hi, I am TimeBridgeAI", isBot: "bot" }]); // Limpiar mensajes si se elimina el chat seleccionado
        }
    } catch (error) {
        console.error('Error al eliminar el chat:', error);
    }
};
const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };



    const handleRenameChat = async (chatId) => {
        const newTitle = prompt("Nuevo nombre del chat");
        if (newTitle && newTitle.trim() !== '') {
            try {
                await updateChat(chatId, { titulo: newTitle });
                const updatedChats = chats.map(chat => 
                    chat.id_chat === chatId ? { ...chat, titulo: newTitle } : chat
                );
                setChats(updatedChats);
            } catch (error) {
                console.error('Error al renombrar el chat:', error);
            }
        }
    };


    const handleEnter = async (e) => {
      if(e.key=='Enter') await handleSend();
    }
    const handleChatSelect = (chatId) => {
      console.log(`Chat seleccionado: ${chatId}`); // Agregar log para depuración
      setSelectedChat(chatId);
      setMessages([
        { text: "Hi, I am TimeBridgeAI",
          isBot: "bot", }
    ]);
    };

    const handleChatNew = async () => {
      setSelectedChat(false)
      setMessages([
        { text: "Hi, I am TimeBridgeAI",
          isBot: "bot", }
    ]);

    };
    
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


    //recoleccion datos usuario
    const [userInfo, setUserInfo] = useState({id: "", username: "", email: ""});


    return (

        <div className='App'>
        <div className='menucostado'>
          <div className="arribaCostado">
            <div className="arribaCostadoEncima"><img src={TimeLogo} alt="Logo" className="logo" /><span className="marca">TimeBridgeAI</span></div>
            <button className="botonMedio" onClick={handleChatNew}><img src={AggBtn} alt="" className="botonAgg" />Nuevo chat</button>
            <div className="arribaCostadoDebajo">
            {chats.map(chat => (
                <div key={chat.id_chat} className={`flex items-center justify-between w-full px-1 py-2 rounded-md mb-2 text-2xl
                  ${selectedChat === chat.id_chat ? 'bg-teal-600 text-black' : 'hover:bg-teal-500'}
                            `}>
                                <button
                                    className="flex items-center justify-start w-full"
                                    onClick={() => handleChatSelect(chat.id_chat)}
                                >
                                    <img src={MsgIcon} alt="Query" className="w-6 h-6 mr-2" />
                                    <span className="ml-2">{chat.titulo}</span>
                                </button>
                                <div className="dropdown">
                                  <button className="dropbtn px-3" onClick={toggleDropdown}>⋮</button>
                                  {isOpen && (
                                    <div className="dropdown-content">
                                      <button className='button block px-3 py-2 text-m text-gray-700' onClick={() => { handleRenameChat(chat.id_chat); closeDropdown(); }}>Renombrar</button>
                                      <button className='button block px-3 py-2 text-m text-gray-700' onClick={() => { handleDeleteChat(chat.id_chat); closeDropdown(); }}>Eliminar</button>
                                    </div>
                                  )}
                                </div>

                    </div>
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
                                  {userInfo.username}
                                  </dd>
                              </div>
                              <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                  <dt class="text-xl font-medium text-white">
                                      Email address
                                  </dt>
                                  <dd class="mt-1 text-xl text-white sm:mt-0 sm:col-span-2">
                                  {userInfo.email}
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
              <div key={i} className={message.isBot=="bot"?"chat bot":"chat"}>
                <img className='chatImg' src={message.isBot=="bot"?ChatgptLogo:IconoUsuario} alt="" /><p className="txt">{message.text}</p>
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
