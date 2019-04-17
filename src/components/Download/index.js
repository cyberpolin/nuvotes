import React, { Component } from 'react'
import { Icon } from 'react-native-elements'
import {
  TouchableOpacity,
  Platform
} from 'react-native'
import { connect } from 'react-redux'
import ProgressCircle from 'react-native-progress-circle'
import RNFetchBlob from 'rn-fetch-blob'
import { showMessage } from 'react-native-flash-message'
import FileViewer from 'react-native-file-viewer'
import { getMessage } from '../../helpers/messages'
import { changeDownload } from '../../actions/settings'
import { primary } from '../../colorPalette'
import { styles } from './styled'

const isIOS = Platform.OS === 'ios'

class Download extends Component {
  constructor (props) {
    super(props)
    this.state = {
      didDownload: false,
      progress: 0,
      downloadSuccess: false
    }
    this.handleDownload = this.handleDownload.bind(this)
    this.downloadFile = this.downloadFile.bind(this)
  }
  render () {
    const { didDownload, progress, downloadSuccess } = this.state
    const { isDownloading } = this.props.settings
    return (
      <TouchableOpacity
        disabled={isDownloading}
        onPress={this.handleDownload}
      >
        {didDownload
          ? downloadSuccess
            ? <Icon
              name='check'
              type='font-awesome'
              color={primary}
              iconStyle={styles.iconStyle}
            />
            : <ProgressCircle
              percent={progress}
              radius={30}
              borderWidth={4}
              color={primary}
              shadowColor='#C4C4C4'
              bgColor='#FFF'
            >
              <Icon
                name='download'
                type='font-awesome'
                color={primary}
                iconStyle={styles.iconStyle}
              />
            </ProgressCircle>
          : <Icon
            name='download'
            type='font-awesome'
            color={isDownloading ? 'B4B4B4' : primary}
            iconStyle={styles.iconStyle}
            containerStyle={{marginRight: 8}}
          />
        }
      </TouchableOpacity>
    )
  }

  handleDownload () {
    const { url, filename } = this.props
    const { changeDownload } = this.props
    this.setState({ didDownload: true })
    changeDownload(true)
    this.downloadFile(url, filename).then()
  }

  downloadFile (url, filename) {
    const { changeDownload } = this.props
    const dirs = RNFetchBlob.fs.dirs
    return RNFetchBlob
      .config({
        addAndroidDownloads: {
          useDownloadManager: true,
          description: 'File downloaded from Nuvote',
          notification: true,
          mediaScannable: true,
          path: dirs.DownloadDir + '/' + filename
        },
        fileCache: true,
        path: dirs.DocumentDir + '/' + filename
      })
      .fetch('GET', url)
      .progress({interval: 5}, (received, total) => {
        var progress = Math.round((received / total) * 100)
        this.setState({ progress })
        if (progress === 100) {
          this.setState({ progress: 0 })
          this.setState({ downloadSuccess: true })
          changeDownload(false)
          setTimeout(() => {
            this.setState({ didDownload: false })
            this.setState({ downloadSuccess: false })
          }, 4000)
        }
      })
      .then((res) => {
        const status = res.info().status
        if (status === 200) {
          if (isIOS) {
            const path = res.path()
            FileViewer.open(path, { showOpenWithDialog: true })
              .then(() => {
              })
              .catch(() => {
                const message = getMessage('FILE_ERROR')
                showMessage(message)
              })
          }
        }
      }).catch((error, status) => {
        console.log('ERROR', error)
        console.log('STATUS', status)
      })
  }
}

const mapStateToProps = ({ settings }) => ({
  settings
})

const mapDispatchToProps = dispatch => ({
  changeDownload: isDownloading => dispatch(changeDownload(isDownloading))
})

export default connect(mapStateToProps, mapDispatchToProps)(Download)
