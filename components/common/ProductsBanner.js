import React from "react";

export const ProductsBanner = () => {
  return (
    <section className='w-section flex flex-col lg:flex-row'>
      <div className='flex-1 bg-primary/80 text-primary-content relative overflow-hidden '>
        <div className='card-body grid grid-cols-3 px-6 md:px-16'>
          <div className='col-span-2 space-y-2'>
            <h1 href='/' className='card-title'>
              AirPods
            </h1>
            <p>Immersing you in rich, high-quality sound. Just like magic.</p>
            <div className='card-actions'>
              <button className='btn'>Buy Now</button>
            </div>
          </div>
          <div className='h-96 w-96 bg-white/10 blur-3xl absolute right-0 top-0' />
          <img
            src='/Airpods.png'
            alt=''
            className='h-44 object-contain col-span-1'
          />
        </div>
      </div>
      <div className='flex-1 bg-secondary text-secondary-content relative overflow-hidden '>
        <div className='card-body grid grid-cols-3 px-6 md:px-16'>
          <div className='col-span-2 space-y-2'>
            <h1 href='/' className='card-title'>
              Apple Watch Ultra
            </h1>
            <p>
              The most rugged and capable Apple Watch ever, designed for
              exploration, adventure, and endurance.
            </p>
            <div className='card-actions'>
              <button className='btn'>Buy Now</button>
            </div>
          </div>
          <div className='h-96 w-96 bg-white/10 blur-3xl absolute right-0 top-0' />
          <img
            src='/Apple-Watch-Ultra.png'
            alt=''
            className='h-44 object-contain opacity-80 col-span-1'
          />
        </div>
      </div>
    </section>
  );
};
