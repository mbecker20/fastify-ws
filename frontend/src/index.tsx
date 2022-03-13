/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './components/App/App';
import makeNotifications from './components/util/notification/Notifications';

export const URL = "http://localhost:3000";

export const { Notifications, pushNotification } = makeNotifications();

render(() => [<App />, <Notifications />], document.getElementById('root') as HTMLElement);