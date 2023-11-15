import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
 
export function TabsCustomAnimationDirector({data}) {

 
  return (
    <Tabs id="custom-animation" value={data[0].value}>
      <TabsHeader
      className="bg-deep-blue text-white font-bold"
      indicatorProps={{
        className: "bg-blue text-white font-bold z-0",
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