import React, { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { aboutData } from "@/constants/aboutData";

export function AboutSlider() {
  //   const plugin = useRef(
  //     Autoplay({ delay: 2000, stopOnInteraction: true }),
  //   );
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  //   return (
  //     <Carousel
  //       plugins={[plugin.current]}
  //       className="w-full max-w-40 sm:max-w-xs"
  //       onMouseEnter={plugin.current.stop}
  //       onMouseLeave={plugin.current.reset}
  //     >
  //       <CarouselContent>
  //         {aboutData.map((data, index) => (
  //           <CarouselItem key={index}>
  //             <div className="p-4">
  //               <Card>
  //                 <CardContent className="flex flex-col items-center justify-center gap-4 p-6 text-center">
  //                   {/* Image */}
  //                   <img
  //                     src={data.image}
  //                     alt={data.title}
  //                     className="w-32 h-32 rounded-full border-2 border-gray-400 object-cover"
  //                   />

  //                   {/* Description */}
  //                   <p className="text-gray-500 text-sm md:text-base">
  //                     {data.description}
  //                   </p>

  //                   {/* Title */}
  //                   <h3 className="text-lg md:text-xl font-semibold">
  //                     {data.title}
  //                   </h3>
  //                 </CardContent>
  //               </Card>
  //             </div>
  //           </CarouselItem>
  //         ))}
  //       </CarouselContent>
  //       <CarouselPrevious />
  //       <CarouselNext />
  //     </Carousel>
  //   );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-md"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {aboutData.map((data, index) => (
          <CarouselItem key={index} className="basis-full">
            <div className="p-4">
              <Card>
                <CardContent className="flex flex-col items-center justify-center gap-4 p-6 text-center">
                  <img
                    src={data.image}
                    alt={data.title}
                    className="w-32 h-32 rounded-full border-2 border-gray-400 object-cover"
                  />
                  <p className="text-gray-500 text-sm md:text-base">
                    {data.description}
                  </p>
                  <h3 className="text-lg md:text-xl font-semibold">
                    {data.title}
                  </h3>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
