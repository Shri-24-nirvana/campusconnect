import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const usersData = `aanya,agrawal,aanya.agrawal.cd24@ggits.net,Aanya@1234,CD
aanya,mishra,aanya.mishra.cd24@ggits.net,Aanya@1234,CD
aashna,patle,aashna.patle.cd24@ggits.net,Aashna@1234,CD
abhinav,mishra,abhinav.mishra.cd24@ggits.net,Abhinav@1234,CD
abhishek,patel,abhishek.patel.cd24@ggits.net,Abhishek@1234,CD
adarsh,nigam,adarsh.nigam.cd24@ggits.net,Adarsh@1234,CD
adarsh,patel,adarsh.patel.cd24@ggits.net,Adarsh@1234,CD
adarsh,singh,adarsh.singh.cd24@ggits.net,Adarsh@1234,CD
adarsh,tripathi,adarsh.tripathi.cd24@ggits.net,Adarsh@1234,CD
aditya,kanojiya,aditya.kanojiya.cd24@ggits.net,Aditya@1234,CD
advet,soni,advet.soni.cd24@ggits.net,Advet@1234,CD
ajay,raj,ajay.raj.cd24@ggits.net,Ajay@1234,CD
amaan,ansari,amaan.ansari.cd24@ggits.net,Amaan@1234,CD
amrita,kumari,amrita.kumari.cd24@ggits.net,Amrita@1234,CD
ananya,tiwari,ananya.tiwari.cd24@ggits.net,Ananya@1234,CD
aniket,kori,aniket.kori.cd24@ggits.net,Aniket@1234,CD
aniket,patel,aniket.patel.cd24@ggits.net,Aniket@1234,CD
ankush,shivhare,ankush.shivhare.cd24@ggits.net,Ankush@1234,CD
ankush,tiwari,ankush.tiwari.cd24@ggits.net,Ankush@1234,CD
annant,dekate,annant.dekate.cd24@ggits.net,Annant@1234,CD
anoop,upadhyay,anoop.upadhyay.cd24@ggits.net,Anoop@1234,CD
ansh,chouksey,ansh.chouksey.cd24@ggits.net,Ansh@1234,CD
anshika,sisodiya,anshika.sisodiya.cd24@ggits.net,Anshika@1234,CD
anshul,singour,anshul.singour.cd24@ggits.net,Anshul@1234,CD
arpit,dahiya,arpit.dahiya.cd24@ggits.net,Arpit@1234,CD
aryan,agrahari,aryan.agrahari.cd24@ggits.net,Aryan@1234,CD
ashi,khatri,ashi.khatri.cd24@ggits.net,Ashi@1234,CD
ashish,bopche,ashish.bopche.cd24@ggits.net,Ashish@1234,CD
ashutosh,yadav,ashutosh.yadav.cd24@ggits.net,Ashutosh@1234,CD
ashwin,sethi,ashwin.sethi.cd24@ggits.net,Ashwin@1234,CD
avishi,pandya,avishi.pandya.cd24@ggits.net,Avishi@1234,CD
ayush,kori,ayush.kori.cd24@ggits.net,Ayush@1234,CD
ayush,soni,ayush.soni.cd24@ggits.net,Ayush@1234,CD
ayush,upadhyay,ayush.upadhyay.cd24@ggits.net,Ayush@1234,CD
ayushman,rajpoot,ayushman.rajpoot.cd24@ggits.net,Ayushman@1234,CD
bhoomika,singh,bhoomika.singh.cd24@ggits.net,Bhoomika@1234,CD
dev,chakravarty,dev.chakravarty.cd24@ggits.net,Dev@1234,CD
gopal,soni,gopal.soni.cd24@ggits.net,Gopal@1234,CD
gouri,swami,gouri.swami.cd24@ggits.net,Gouri@1234,CD
gunjan,bhangre,gunjan.bhangre.cd24@ggits.net,Gunjan@1234,CD
harsh,dwivedi,harsh.dwivedi.cd24@ggits.net,Harsh@1234,CD
harsh,kushwaha,harsh.kushwaha.cd24@ggits.net,Harsh@1234,CD
harshit,paras,harshit.paras.cd24@ggits.net,Harshit@1234,CD
isha,chisty,isha.chisty.cd24@ggits.net,Isha@1234,CD
kranti,sendram,kranti.sendram.cd24@ggits.net,Kranti@1234,CD
krish,naidu,krish.naidu.cd24@ggits.net,Krish@1234,CD
krishna,pal,krishna.pal.cd24@ggits.net,Krishna@1234,CD
kuldeep,patel,kuldeep.patel.cd24@ggits.net,Kuldeep@1234,CD
lakhan,patel,lakhan.patel.cd24@ggits.net,Lakhan@1234,CD
mahi,jain,mahi.jain.cd24@ggits.net,Mahi@1234,CD
mann,rohela,mann.rohela.cd24@ggits.net,Mann@1234,CD
mayank,chakrawarti,mayank.chakrawarti.cd24@ggits.net,Mayank@1234,CD
mohd,zaid,mohd.zaid.cd24@ggits.net,Mohd@1234,CD
mohit,vishwakarma,mohit.vishwakarma.cd24@ggits.net,Mohit@1234,CD
namburi,abhishikth,namburi.abhishikth.cd24@ggits.net,Namburi@1234,CD
nikhil,kumar,nikhil.kumar.cd24@ggits.net,Nikhil@1234,CD
nikhil,singh,nikhil.singh.cd24@ggits.net,Nikhil@1234,CD
nikhil,yadav,nikhil.yadav.cd24@ggits.net,Nikhil@1234,CD
nishant,kumar,nishant.kumar.cd24@ggits.net,Nishant@1234,CD
nitin,tiwari,nitin.tiwari.cd24@ggits.net,Nitin@1234,CD
palak,gupta,palak.gupta.cd24@ggits.net,Palak@1234,CD
palak,patel,palak.patel.cd24@ggits.net,Palak@1234,CD
piyush,katiya,piyush.katiya.cd24@ggits.net,Piyush@1234,CD
pooja,chhabra,pooja.chhabra.cd24@ggits.net,Pooja@1234,CD
prachi,soni,prachi.soni.cd24@ggits.net,Prachi@1234,CD
prathveesh,dubey,prathveesh.dubey.cd24@ggits.net,Prathveesh@1234,CD
prince,jain,prince.jain.cd24@ggits.net,Prince@1234,CD
princi,soni,princi.soni.cd24@ggits.net,Princi@1234,CD
priyanshi,singh,priyanshi.singh.cd24@ggits.net,Priyanshi@1234,CD
priyanshu,baghel,priyanshu.baghel.cd24@ggits.net,Priyanshu@1234,CD
purushottam,kori,purushottam.kori.cd24@ggits.net,Purushottam@1234,CD
raj,choudhary,raj.choudhary.cd24@ggits.net,Raj@1234,CD
rajat,shivhare,rajat.shivhare.cd24@ggits.net,Rajat@1234,CD
rajveer,sisodiya,rajveer.sisodiya.cd24@ggits.net,Rajveer@1234,CD
rashi,pathak,rashi.pathak.cd24@ggits.net,Rashi@1234,CD
rishiraj,jaiswal,rishiraj.jaiswal.cd24@ggits.net,Rishiraj@1234,CD
riyansh,yadav,riyansh.yadav.cd24@ggits.net,Riyansh@1234,CD
rohit,gupta,rohit.gupta.cd24@ggits.net,Rohit@1234,CD
rudrapratap,parihar,rudrapratap.parihar.cd24@ggits.net,Rudrapratap@1234,CD
sachi,chouksey,sachi.chouksey.cd24@ggits.net,Sachi@1234,CD
saksham,sharma,saksham.sharma.cd24@ggits.net,Saksham@1234,CD
salil,tiwari,salil.tiwari.cd24@ggits.net,Salil@1234,CD
sanya,mishra,sanya.mishra.cd24@ggits.net,Sanya@1234,CD
shailendra,shrivastava,shailendra.shrivastava.cd24@ggits.net,Shailendra@1234,CD
shambhavi,suryawanshi,shambhavi.suryawanshi.cd24@ggits.net,Shambhavi@1234,CD
shipra,roy,shipra.roy.cd24@ggits.net,Shipra@1234,CD
shivam,singh,shivam.singh.cd24@ggits.net,Shivam@1234,CD
shivansh,pathak,shivansh.pathak.cd24@ggits.net,Shivansh@1234,CD
shivanshu,sharma,shivanshu.sharma.cd24@ggits.net,Shivanshu@1234,CD
shlok,mishra,shlok.mishra.cd24@ggits.net,Shlok@1234,CD
shriya,kesharwani,shriya.kesharwani.cd24@ggits.net,Shriya@1234,CD
shriyash,soni,shriyash.soni.cd24@ggits.net,Shriyash@1234,CD
shruti,chourasia,shruti.chourasia.cd24@ggits.net,Shruti@1234,CD
shubhkrishn,mishra,shubhkrishn.mishra.cd24@ggits.net,Shubhkrishn@1234,CD
siddharth,vishwakarma,siddharth.vishwakarma.cd24@ggits.net,Siddharth@1234,CD
sidharth,mehra,sidharth.mehra.cd24@ggits.net,Sidharth@1234,CD
sneha,vishwakarma,sneha.vishwakarma.cd24@ggits.net,Sneha@1234,CD
som,sahu,som.sahu.cd24@ggits.net,Som@1234,CD
sumit,yadav,sumit.yadav.cd24@ggits.net,Sumit@1234,CD
suraj,kumar,suraj.kumar.cd24@ggits.net,Suraj@1234,CD
surya,rajak,surya.rajak.cd24@ggits.net,Surya@1234,CD
tanishq,roy,tanishq.roy.cd24@ggits.net,Tanishq@1234,CD
ujjawal,pandey,ujjawal.pandey.cd24@ggits.net,Ujjawal@1234,CD
utkarsh,kushwaha,utkarsh.kushwaha.cd24@ggits.net,Utkarsh@1234,CD
utsav,sahu,utsav.sahu.cd24@ggits.net,Utsav@1234,CD
vaibhwi,kumari,vaibhwi.kumari.cd24@ggits.net,Vaibhwi@1234,CD
vaishali,lodhi,vaishali.lodhi.cd24@ggits.net,Vaishali@1234,CD
vansh,jaiswal,vansh.jaiswal.cd24@ggits.net,Vansh@1234,CD
vanshika,patel,vanshika.patel.cd24@ggits.net,Vanshika@1234,CD
varun,soni,varun.soni.cd24@ggits.net,Varun@1234,CD
vedika,bhatia,vedika.bhatia.cd24@ggits.net,Vedika@1234,CD
venkatesh,gupta,venkatesh.gupta.cd24@ggits.net,Venkatesh@1234,CD
verendra,raghuwanshi,verendra.raghuwanshi.cd24@ggits.net,Verendra@1234,CD
vidhan,paroha,vidhan.paroha.cd24@ggits.net,Vidhan@1234,CD
vidhi,shukla,vidhi.shukla.cd24@ggits.net,Vidhi@1234,CD
vishal,raikwar,vishal.raikwar.cd24@ggits.net,Vishal@1234,CD
vishesh,raikwar,vishesh.raikwar.cd24@ggits.net,Vishesh@1234,CD
yash,jain,yash.jain.cd24@ggits.net,Yash@1234,CD
yash,raman,yash.raman.cd24@ggits.net,Yash@1234,CD
yash,tippanwar,yash.tippanwar.cd24@ggits.net,Yash@1234,CD
yashaswi,dubey,yashaswi.dubey.cd24@ggits.net,Yashaswi@1234,CD
yogita,mishra,yogita.mishra.cd24@ggits.net,Yogita@1234,CD`;

async function main() {
  const lines = usersData.split('\n');
  let successCount = 0;

  for (const line of lines) {
    if (!line.trim()) continue;
    const parts = line.split(',');
    if (parts.length < 5) continue;

    const firstName = parts[0].trim();
    const lastName = parts[1].trim();
    const email = parts[2].trim();
    const password = parts[3].trim();
    const department = parts[4].trim();

    const name = firstName.charAt(0).toUpperCase() + firstName.slice(1) + ' ' + lastName.charAt(0).toUpperCase() + lastName.slice(1);

    try {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (!existingUser) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
          data: {
            name,
            email,
            passwordHash: hashedPassword,
            role: 'STUDENT',
          }
        });

        await prisma.profile.create({
          data: {
            userId: newUser.id,
            branch: department,
            year: '2024',
            skills: [],
            bio: 'Student at GGITS',
          }
        });
        
        // Setup initial rank
        await prisma.ranking.create({
           data: { userId: newUser.id, score: 0 }
        });
        
        successCount++;
        console.log(`Created ${name} (${email})`);
      } else {
        console.log(`Skip existing: ${email}`);
      }
    } catch (e) {
      console.error(`Failed on ${email}:`, e);
    }
  }

  console.log(`Successfully seeded ${successCount} students.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
