// http://localhost:3000/api/revalidate?path=/&secret=process.env.NEXTAUTH_SECRET

// import { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(
//     req: NextApiRequest, res: NextApiResponse
// ){
//     // if(req.query.secret !== process.env.NEXTAUTH_URL){
//     //     return res.status(401).json({message: "Invalid"})
//     // }

//     const path = req.query.path as string;
//     await res.revalidate(path);

//     return res.json({revaliated: true})
// }