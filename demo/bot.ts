import { Client } from '../src/main';
import { Message } from '../src/structures/message';

const bot = new Client();

bot.on('ready', () => console.log(`${bot.user.username} is online!`));
bot.on('message', async (message: Message) => {
  console.log(message.content);
    
  await bot.ws.sendMessage('hi', message.channel);
});

bot.login('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxNjExNDAxNTgxOTYzMTcxMTUiLCJpYXQiOjE2MTE0MDE1ODIsImV4cCI6MTYxMjAwNjM4Mn0.7mge7hG88jG2cBb-Lkg_-cnBCzR0gR2inF5PJW5N0KE');
