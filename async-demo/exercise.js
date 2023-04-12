sendEmailToCustomer(1)

async function sendEmailToCustomer(id) {
  try {
    const customer = await getCustomer(id);
    console.log('Customer: ', customer)
    if(customer.isGold){
      const movies = await getTopMovies();
      await sendEmail(customer.email, movies);
    };
  } catch (err) {
    console.log(err.message)
  }
}


function getCustomer(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Getting customer...')
      resolve({ 
        id: 1, 
        name: 'Mosh Hamedani', 
        isGold: true, 
        email: 'email' 
      })
    }, 2000);
  });
};

function getTopMovies() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Getting movies...")
      resolve(['movie1', 'movie2']);
    }, 4000);
  });
};

function sendEmail(email, movies) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Email with ${movies} sent to ${email}`);
      resolve();
    }, 4000);
  });
};