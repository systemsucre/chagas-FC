
import Videos from 'views/public/videos'
import Folletos from 'views/public/folletos'
import Fotografias from 'views/public/fotografias'
import IEC from 'views/public/iec'
import Login from 'views/session/sing-in';
import { LOCAL_URL } from 'Auth/config';
import E500 from 'rutas/e500';
import Icons from 'views/Icons';
var routes = [
  {
    public: true,
    path: "",
    name: "INCIO",
    icon: "tim-icons icon-heart-2",
    component: <IEC />,
    layout: '/',
  },
  {
    public: true,
    path: "fotografias",
    name: "FOTOGRAFIAS",
    icon: "tim-icons icon-camera-18",
    component: <Fotografias />,
    layout: '/',
  },
  {
    public: true,
    path: "/videos",
    path: "videos",
    name: "VIDEOS",
    icon: "tim-icons icon-video-66",
    component: <Videos />,
    layout: '/',
  },

  {
    public: true,
    path: "/folletos",
    path: "folletos",
    name: "FOLLETOS",
    icon: "tim-icons icon-book-bookmark",
    component: <Folletos />,
    layout: '/',
  },

  {
    public: true,
    path:  "/login",
    path: "login",
    name: "LOGIN",
    icon: "tim-icons icon-lock-circle",
    component: <Login />,
    layout: '/',
  },
  // {
  //   public: true,
  //   path: "/icons",
  //   path: "icons",
  //   name: "ICONS",
  //   icon: "tim-icons icon-video-66",
  //   component: <Icons />,
  //   layout: '/',
  // },

];
export default routes;
