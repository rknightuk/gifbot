import fs from 'fs'
import postToMastodon from './poster.js'

const bots = [
    'mycoolbot'
]

const currentPath = process.argv[1].replace('index.js', '')

const getPreviousData = (botKey) => {
    const previousPath = `${currentPath}data/${botKey}.previous`
    const previousDataExists = fs.existsSync(previousPath)

    if (!previousDataExists)
    {
        console.log('🗒️ Making previous file')
        fs.writeFileSync(previousPath, '')
    }

    return fs.readFileSync(previousPath, 'utf8')
}

const run = async () => {
    const botKey = process.argv[2]

    if (!botKey) {
        console.log('❌ You must pass a bot key')
        return
    }

    if (!bots.includes(botKey))
    {
        console.log('❌ No bot found')
        return
    }

    let previous = getPreviousData(botKey)

    const gifs = fs.readdirSync(`${currentPath}data/${botKey}_gifs`)

    let found = gifs[Math.floor(Math.random() * gifs.length)]

    while (previous.includes(found))
    {
        found = gifs[Math.floor(Math.random() * gifs.length)]
    }

    previous += `\n${found}`

    fs.writeFileSync(`${currentPath}data/${botKey}.previous`, previous)

    const description = found.replace('.gif', '').split('-').slice(1).join(' ')

    const status = await postToMastodon(botKey, `${currentPath}data/${botKey}_gifs/${found}`, description)

    console.log(`⭐ Created post at ${status.url}!`)
}

run()