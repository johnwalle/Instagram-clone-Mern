import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
    return (

        <div className="flex bg-black text-white m-auto justify-center items-center h-screen">
            <motion.div
                className="flex items-center space-x-2"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, loop: Infinity, ease: 'linear' }}
            >
                <span className="w-2 h-2 bg-white rounded-full" />
                <span className="w-2 h-2 bg-white rounded-full" />
                <span className="w-2 h-2 bg-white rounded-full" />
            </motion.div>
            <p className="ml-2 text-white">Loading...</p>
        </div>
    );
};

export default Loader;