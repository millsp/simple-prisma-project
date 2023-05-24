import Watcher from 'watcher'
import { minimatch } from 'minimatch'

async function main() {

  const startFileWatcher = (rootPath) => {
    console.debug('Starting File Watcher')
    // https://github.com/fabiospampinato/watcher
    const watcher = new Watcher ( '/foo/bar' );

    return new Watcher(rootPath, {
      debounce: 500,
      // limits how many levels of subdirectories will be traversed.
      // Note that `node_modules/.prisma/client/` counts for 3 already
      // Example
      // If vs code extension is open in root folder of a project and the path to index.d.ts is
      // ./server/database/node_modules/.prisma/client/index.d.ts
      // then the depth is equal to 2 + 3 = 5
      depth: 9,
      recursive: true,
      ignoreInitial: true,
      ignore: (targetPath) => {
        let ignore = true
        if (targetPath === rootPath) {
          console.log("targetPath===rootPath", targetPath, rootPath)
          ignore = false
        } else {
          ignore = !minimatch(targetPath, '**/node_modules/.prisma/client/index.d.ts')
        }

        console.log("targetPath", targetPath, "ignore=", ignore)

        return ignore
      },
      //   // ignore dotfiles (except .prisma) adjusted from chokidar README example
      //   ignored: /(^|[\/\\])\.(?!prisma)./,

      // native?: boolean,
      // persistent?: boolean,
      // pollingInterval?: number,
      // pollingTimeout?: number,
      // renameDetection?: boolean,
      // renameTimeout?: number
    })
  }

  const onFileChange = (filepath) => {
    console.debug(`File ${filepath} has been changed. Restarting TS Server.`)
    console.log()
    console.log()
    console.log()
    console.log()
    console.log()
    // commands.executeCommand('typescript.restartTsServer') // eslint-disable-line
  }

  const rootPath = "C:\\Users\\Jan\\Documents\\throwaway\\simple-prisma-project"

  let watcherInstance = startFileWatcher(rootPath)
  // If the file was just created
  watcherInstance.on('add', onFileChange)
  // If the file was modified
  watcherInstance.on('change', onFileChange)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    // await prisma.$disconnect()
  })
