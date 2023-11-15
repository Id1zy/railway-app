
import { useEffect, useRef, useState } from 'react'
import HeroMain from '../../components/heros/main';
import Page from '../../hocs/layouts/Page';
import { motion, useScroll } from 'framer-motion';

function Home(){
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target:ref,
    offset: ["0 1", "1.33 1"]
  });

  useEffect(() => {

  }, []);

    return(
      <Page>
         <HeroMain/>

              <section ref={ref} className="relative">
                <div className="relative mx-auto max-w-screen px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8 bg-light-gray ">
                <motion.div ref={ref} className="relative"  style={{
              scale: scrollYProgress,
              opacity: scrollYProgress,
              transformOrigin: 'top left'
            }}>
                
                <div className="p-8">
  <div className="flex felx-col items-center justify-center">
    <span
      className="rounded-full bg-indigo-500 px-2 py-1 text-white uppercase text-sm"
    >
      Insight
    </span>
  </div>
  <h1 className="text-4xl font-medium text-white text-center mt-6">
    Full-Funnel Social Analytics
  </h1>
  <p className="text-center mt-6 text-lg font-light text-white">
    The time is now for it to be okay to be great. For being a bright color. For
    standing out.
  </p>
</div>

<div className="grid grid-cols-1 md:grid-cols-3">
  <div className="p-8">
    <div
      className="bg-indigo-100 rounded-full w-16 h-16 flex justify-center items-center text-indigo-500 shadow-2xl"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
    <h2 className="uppercase mt-6 text-indigo-500 font-medium mb-3">
      Social conversations
    </h2>
    <p className="font-light text-sm text-white mb-3">
      We get insulted by others, lose trust for those others. We get back
      stabbed by friends. It becomes harder for us to give others a hand.
    </p>
    <a className="text-indigo-500 flex items-center hover:text-indigo-600" href="/">
      More about us icon
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clip-rule="evenodd"
        />
      </svg>
    </a>
  </div>

  <div className="p-8">
    <div
      className="bg-green-100 rounded-full w-16 h-16 flex justify-center items-center text-green-500 shadow-2xl"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
    <h2 className="uppercase mt-6 text-green-500 font-medium mb-3">
      Social conversations
    </h2>
    <p className="font-light text-sm text-white mb-3">
      We get insulted by others, lose trust for those others. We get back
      stabbed by friends. It becomes harder for us to give others a hand.
    </p>
    <a className="text-green-500 flex items-center hover:text-green-600" href="/">
      More about us icon
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clip-rule="evenodd"
        />
      </svg>
    </a>
  </div>
  <motion.div ref={ref} className="relative"  style={{
              scale: scrollYProgress,
              opacity: scrollYProgress,
              transformOrigin: 'top right'
            }}>
                <div className="p-8">
    <div
      className="bg-red-100 rounded-full w-16 h-16 flex justify-center items-center text-red-500 shadow-2xl"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
    <h2 className="uppercase mt-6 text-red-500 font-medium mb-3">
      Social conversations
    </h2>
    <p className="font-light text-sm text-white mb-3">
      We get insulted by others, lose trust for those others. We get back
      stabbed by friends. It becomes harder for us to give others a hand.
    </p>
    <a className="text-red-500 flex items-center hover:text-red-600" href="/">
      More about us icon
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clip-rule="evenodd"
        />
      </svg>
    </a>
  </div>
            </motion.div>

</div>
                </motion.div>
                


                </div>
                </section>

             <HeroMain/>

      </Page>
        
    )
}

export default Home
  


