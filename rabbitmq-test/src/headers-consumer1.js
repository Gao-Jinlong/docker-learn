import * as amqp from 'amqplib';

const connect = await amqp.connect('amqp://localhost:5672');
const channel = await connect.createChannel();

await channel.assertExchange('test-exchange4', 'headers');

const { queue } = await channel.assertQueue('queue1');
await channel.bindQueue(queue, 'test-exchange4', '', {
  name: 'ginlon',
});

channel.consume(
  queue,
  (msg) => {
    console.log(msg.content.toString());
  },
  { noAck: true },
);
