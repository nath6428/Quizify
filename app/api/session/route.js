const { getSession } = require("@/utils/mySession");


export const GET = async (req, res) => {

    try {
        const session = await getSession();
        return new Response(JSON.stringify(session), { status: 201 })
    } catch (error) {
        console.log(error)
        return new Response(error, { status: 500 })
    }
}

