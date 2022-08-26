const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {

    const createdCustomerAndContact = await prisma.customer.create({
        data: {
            name: 'Alice',
            contact: {
                create: {
                    phone: '123456',
                    email: 'blah@blah.com'
                }
            }
        }
    });

    console.log('Customer created', createdCustomerAndContact);

    // Add your code here

    // FIRST APPROACH

    // const createdContact = await prisma.contact.create({
    //     data: {
    //         phone: '123456',
    //         email: 'blah@blah.com',
    //         customerId: createdCustomer.id
    //     }
    // })
    
    const createdScreen = await prisma.screen.create({
        data: {
            number: 5
        }
    })

    const createdMovie = await prisma.movie.create({
        data: {
            title: 'Spiderman',
            runtimeMins: 140
        }
    })

    const createdScreening = await prisma.screening.create({
        data: {
            startsAt: new Date('August 27, 2022 18:00:00'),
            screenId: createdScreen.id,
            movieId: createdMovie.id
        }
    })

    const createdTicket = await prisma.ticket.create({
        data: {
            customerId: createdCustomerAndContact.id,
            screeningId: createdScreening.id
        }
    })

    // Don't edit any of the code below this line
    process.exit(0);
}

seed()
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    })
