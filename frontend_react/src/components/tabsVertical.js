import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";
   
  export function TabsVerticalCustomAnimation({data}) {
  
   
    return (
      <Tabs orientation="vertical" id="custom-animation" value={data[0].value}>
        <TabsHeader
        className="text-white font-bold"
        indicatorProps={{
          className: "bg-admin-black text-white font-bold z-0",
        }}
        >
          {data.map(({ label, value }) => (
            <Tab key={value} value={value} className="z-0"> 
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody
          animate={{
            initial: { y: 250 },
            mount: { y: 0 },
            unmount: { y: 250 },
          }}
        >
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value}>
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    );
  }