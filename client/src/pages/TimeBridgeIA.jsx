
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
import { getConversacion } from '../api/conversacion.api';
import { infoUser } from '../api/userServicesInfo.api'
import { loadScript } from "@paypal/paypal-js"
import { apiCreateOrderPaypal } from "../api/paypal";
import { apiOnApprovePaypal } from "../api/paypal";
import {updateUserRole} from "../api/userUpdateRol.api"
import Section from '../components/Section';
import Heading from '../components/Heading';
import { Gradient } from '../components/design/Services';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../components/Button';
import { Navigate, useNavigate } from 'react-router-dom';
export function TimeBridgeIA () {
    const msgEnd = useRef(null);
    const [input, setInput] = useState("");
    const [messages, setMessages ] = useState([
      {
        text: "Hi, I am TimeBridgeAI",
        isBot: "bot",
      }
    ]);

    const navigate = useNavigate();

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
  
      let chatId = selectedChat;
  
      // Si no hay un chat seleccionado, creamos uno nuevo antes de enviar el mensaje
      if (!chatId) {
          const nuevoChat = {
              titulo: text.length > 30 ? text.substring(0, 30) : text, // Limitar el título a 30 caracteres
              id_usuario: userInfo.id, // Cambiar por el ID del usuario de la sesión
          };
  
          try {
              const res = await Insertarchats(nuevoChat);
              const createdChat = res.data;
              
              // Actualizar el estado de los chats y seleccionar el chat recién creado
              setChats([...chats, createdChat]);
              chatId = createdChat.id_chat; // Asignar el ID del nuevo chat
              setSelectedChat(chatId);
          } catch (error) {
              console.error('Error al crear y guardar el nuevo chat:', error);
              return; // Salir si hay un error al crear el chat
          }
      }
  
      // Ahora enviamos el mensaje al backend
      try {
          setMessages([
              ...messages,
              { text, isBot: "user" },
          ]);
  
          const response = await sendMsgToBackend(chatId, text);
          
          setMessages(prevMessages => [
              ...prevMessages,
              { text: response, isBot: "bot" }
          ]);
      } catch (error) {
          console.error('Error al enviar el mensaje:', error);
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
      getConversacion(chatId)
        .then(response => {
          console.log(response)
            const fetchedMessages = response.data.map(conversation => ({
                text: conversation.texto, // O el campo que tengas en tu respuesta de la API
                isBot: conversation.rol === 'bot' ? 'bot' : 'user', // Ajustar según sea 'bot' o 'user'
            }));

            // Actualizar los mensajes en el estado
            setMessages(fetchedMessages);
        })
        .catch(error => {
            console.error('Error fetching conversations:', error);
        });

    };

    const handleChatNew = async () => {
      if (chats.length === 5 && userInfo.rol != 3) {
        toast.warning(`solo puedes tener 5 chats en una cuenta gratis`, {
          autoClose: 3000,
          position: "top-center", // Tiempo en milisegundos antes de que el toast se cierre automáticamente
      });
      }else{
        setSelectedChat(false)
      setMessages([
        { text: "Hi, I am TimeBridgeAI",
          isBot: "bot", }
    ]);
      }
      

    };
    const [showPaypal, setShowPaypal] = useState(false); // Estado para mostrar/ocultar

    const handlePaypalClick = () => {
      setShowPaypal(!setShowPaypal); // Alternar estado}
      initPaypal(); 
      if (showPaypal) {
        // Inicializar PayPal solo si el botón está visible}
      }
    };

    let paypal;
    const initPaypal = async() =>{
        
        try {
            paypal = await loadScript({ clientId: "test" });
        } catch (error) {
            console.error("failed to load the PayPal JS SDK script", error);
        }

        if (paypal) {
            try {
                await paypal.Buttons({
                    style: {
                        layout: 'vertical',
                        color:  'blue',
                        shape:  'rect',
                        label:  'paypal'
                      },
                      async createOrder(){
                        const idOrder = apiCreateOrderPaypal()
                        return idOrder
                      },
                      async onApprove(data){
                        console.log("en el componente ",data)
                        const details = await apiOnApprovePaypal(data)

                        toast.success(`compra completada por ${details.payer.name.given_name} ahora ${userInfo.username} eres premiun. re logea para efectuar cambios`, {
                          onClose: () => window.location.reload(), // cierra el modal
                          autoClose: 3000,
                          position: "top-center", // Tiempo en milisegundos antes de que el toast se cierre automáticamente
                      });

                        updateUserRole(userInfo.id, 3)

                      }
                }).render("#btns-paypal");
            } catch (error) {
                console.error("failed to render the PayPal Buttons", error);
            }
        }

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

    const handlelogout = async () => {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          await logoutUser({ refresh: refreshToken });
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          setLoggedIn(false);
          setUsername("");
          navigate('/login')

        }
      } catch (error) {
        console.log("Failed Logout");
        navigate('/login')
      }
    };

    //recoleccion datos usuario
    const [userInfo, setUserInfo] = useState({id: "", username: "", email: "", rol: ""});


    return (

        <div className='App'>
        <div className='menucostado'>
          <div className="arribaCostado">
            <div className="arribaCostadoEncima"><img src={TimeLogo} alt="Logo" className="logo" /><span className="marca">TimeBridgeAI</span></div>
            <button className="botonMedio" onClick={handleChatNew}><img src={AggBtn} alt="" className="botonAgg" />Nuevo chat</button>
            <div className="arribaCostadoDebajo">
            {chats.map(chat => (
                <div key={chat.id_chat} className={`flex items-center justify-between w-full px-1 py-2 rounded-2xl mb-2 text-2xl
                  ${selectedChat === chat.id_chat ? 'bg-n-13 text-black' : 'hover:bg-n-14'}
                            `}>
                                <button
                                    className="flex items-center justify-start w-full"
                                    onClick={() => handleChatSelect(chat.id_chat)}
                                >
                                    <img src={MsgIcon} alt="Query" className="w-6 h-6 mr-2" />
                                    <span className="ml-2">{chat.titulo}</span>
                                </button>
                                <div className="dropdown">
                                  <button className="dropbtn px-3 rounded-3xl justify-center text-center" onClick={toggleDropdown}>⋮</button>
                                  {isOpen && (
                                    <div className="dropdown-content">
                                      <button className='button block px-3 py-2 text-m text-gray-700 ' onClick={() => { handleRenameChat(chat.id_chat); closeDropdown(); }}>Renombrar</button>
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
                <Section>
                  <Heading
                  className="text-center h2" 
                  title="Informacion del usuario"
                  />
                <div className='container'>
                  {/* Aqui pondremos la informacion del usuario */}
                  <div className='relative'>
                    <div class="relative justify-center z-1 flex items-center h-[20rem] 
                    mb-5 p-12 border border-n-1/10 rounded-3xl overflow-hidden lg:p-10 xl:h-[24rem] shadow bg-n-7">
                      
                      <div class="border-t px-4 py-5 sm:p-0">
                          <dl class="sm:divide-y sm:divide-gray-200">
                              <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                  <dt class="text-xl font-medium text-white">
                                      Nombre
                                  </dt>
                                  <dd class="mt-1 text-xl text-white sm:mt-0 sm:col-span-2">
                                  {userInfo.username}
                                  </dd>
                              </div>
                              <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                  <dt class="text-xl font-medium text-white">
                                      Correo
                                  </dt>
                                  <dd class="mt-1 text-xl text-white sm:mt-0 sm:col-span-2">
                                  {userInfo.email}
                                  </dd>
                              </div>
                              <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                  <dt class="text-xl font-medium text-white">
                                      Fecha de ingreso
                                  </dt>
                                  <dd class="mt-1 text-xl text-white sm:mt-0 sm:col-span-2">
                                  {userInfo.date_joined}
                                  </dd>
                              </div>
                              <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                  <dt class="text-xl font-medium text-white">
                                      estado cuenta
                                  </dt>
                                  
                                  {userInfo.rol == 3?( 
                                    <dd class="mt-1 text-xl text-white sm:mt-0 sm:col-span-2">
                                      premiun
                                    </dd>
                                  
                                    ):userInfo.rol == 2?(
                                      <dd class="mt-1 text-xl text-white sm:mt-0 sm:col-span-2">
                                        admin
                                      </dd>
                                    ):(
                                      <dd class="mt-1 text-xl text-white sm:mt-0 sm:col-span-2">
                                        usuario gratis
                                      </dd>
                                    )
                                  }
                              </div>
                              
                          </dl>
                          
                      </div>
                      
                      <Gradient/>
                  </div>
                  
                  </div>
                  <Gradient/>
                  
                </div>
                <Button white onClick={handlelogout}>Log out</Button>
                
                </Section>
              )
            })}>
              <img src={Casa} alt="" className="listaItemsImg" />Perfil
          </button>

          {userInfo.rol !== 3 ? (
            <button className="listaItems" onClick={() => handleClick(Cohete, "", {
              content: (
                <Section>
                  <Heading
                    className="text-center h2" 
                    title="Mejora a pro"
                  />
                  <div className='container'>
                    <div className='relative'>
                      <div className="relative justify-center z-1 flex items-center h-[20rem] 
                        mb-5 p-12 border border-n-1/10 rounded-3xl overflow-hidden lg:p-10 xl:h-[24rem] shadow bg-n-7">
                        <div className="flex flex-col pb-3">
                          <p className="parrafoModal pb-10">Valor de la suscripcion 10 USD</p>
                          <div id="btns-paypal"></div>
                          {showPaypal && userInfo.rol != 1 ? (
                            <div id="btns-paypal"></div> // Donde se renderizarán los botones de PayPal
                          ) : (
                            <Button white onClick={handlePaypalClick}>Comprar</Button>
                          )}
                        </div>
                      </div>
                    </div>
                    <Gradient/>
                  </div>
                </Section>
              )
            })}>
              <img src={Cohete} alt="" className="listaItemsImg" />Mejora a pro
            </button>
          ) : (
            <button className="listaItems" onClick={() => handleClick(Cohete, "", {
              content: (
                <Section>
                  <Heading
                    className="text-center h2" 
                    title="Mejora a pro"
                  />
                  <div className='container'>
                    <div className='relative'>
                      <div className="relative justify-center z-1 flex items-center h-[20rem] 
                        mb-5 p-12 border border-n-1/10 rounded-3xl overflow-hidden lg:p-10 xl:h-[24rem] shadow bg-n-7">
                        <div className="flex flex-col pb-3">
                          <p className="parrafoModal pb-10">ya tienes una cuenta Pro</p>
                         
                        </div>
                      </div>
                    </div>
                    <Gradient/>
                  </div>
                </Section>
              )
            })}>
              <img src={Cohete} alt="" className="listaItemsImg" />Mejora a pro
            </button>
          )}
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
        <ToastContainer />
      </div>
      
    );
}

export default TimeBridgeIA;
