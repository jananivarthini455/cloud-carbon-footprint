import React, { FunctionComponent, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardContent, CardActions, Typography, Button } from '@material-ui/core'
import { DriveEta, LocalGasStation, Eco } from '@material-ui/icons'
import { sumCO2 } from './transformData'
import { EstimationResult } from '../types'

type Selection = 'miles' | 'gas' | 'trees'

type ComparisionItem = {
  icon: React.ReactNode
  total: number
  textOne: string
  textTwo: string
}

type Comparision = {
  [char: string]: ComparisionItem
  gas: ComparisionItem
  miles: ComparisionItem
  trees: ComparisionItem
}

const useStyles = makeStyles(({ palette, spacing, typography }) => ({
  root: {
    width: '100%',
    height: '100%',
  },
  title: {
    color: palette.primary.contrastText,
  },
  posOne: {
    color: palette.primary.contrastText,
  },
  posTwo: {
    maxWidth: 250,
  },
  topContainer: {
    backgroundColor: palette.primary.main,
    textAlign: 'center',
  },
  bottomContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '60%',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  metricOne: {
    color: palette.primary.contrastText,
    fontWeight: typography.fontWeightBold,
  },
  metricTwo: {
    color: palette.primary.light,
    fontWeight: typography.fontWeightBold,
    padding: spacing(2),
  },
  icon: {
    height: 60,
    width: 60,
    color: palette.primary.light,
  },
}))

export const CarbonComparisonCard: FunctionComponent<CarbonComparisonCardProps> = ({ data }) => {
  const classes = useStyles()
  const [selection, setSelection] = useState('miles')
  const kgSum: number = sumCO2(data)

  const milesSum = kgSum * 2.48138958
  const gasSum = kgSum * 0.1125239
  const treesSum = kgSum * 0.0165352

  const comparisons: Comparision = {
    gas: {
      icon: <LocalGasStation className={classes.icon} data-testid="gasIcon" />,
      total: gasSum,
      textOne: 'CO2 emissions from',
      textTwo: 'gallons of gasoline consumed',
    },
    miles: {
      icon: <DriveEta className={classes.icon} data-testid="milesIcon" />,
      total: milesSum,
      textOne: 'greenhouse gas emissions from',
      textTwo: 'miles driven by an average passenger vehicle',
    },
    trees: {
      icon: <Eco className={classes.icon} data-testid="treesIcon" />,
      total: treesSum,
      textOne: 'carbon sequestered by',
      textTwo: 'tree seedlings grown for 10 years',
    },
  }

  const updateSelection = (selection: Selection) => {
    setSelection(selection)
  }

  const updateButtonColor = (buttonSelection: Selection) => {
    return buttonSelection === selection ? 'primary' : 'default'
  }

  return (
    <Card className={classes.root}>
      <CardContent className={classes.topContainer}>
        <Typography className={classes.title} gutterBottom>
          Your Cumulative Emissions are
        </Typography>
        <Typography className={classes.metricOne} variant="h4" component="p" data-testid="co2">
          {kgSum.toLocaleString(undefined, { maximumFractionDigits: 1 })} kg CO2e
        </Typography>
        <Typography className={classes.posOne}>that is equivalent to</Typography>
      </CardContent>
      <CardContent className={classes.bottomContainer}>
        <CardContent>{comparisons[selection].icon}</CardContent>
        <CardContent>
          <Typography className={classes.posTwo} variant="h5" component="p">
            {comparisons[selection].textOne}
          </Typography>
          <Typography className={classes.metricTwo} variant="h3" component="p" data-testid="comparison">
            {comparisons[selection].total.toLocaleString(undefined, { maximumFractionDigits: 1 })}
          </Typography>
          <Typography className={classes.posTwo} variant="h5" component="p">
            {comparisons[selection].textTwo}
          </Typography>
        </CardContent>
      </CardContent>
      <CardActions className={classes.buttonContainer}>
        <Button
          variant="contained"
          color={updateButtonColor('miles')}
          size="medium"
          onClick={() => updateSelection('miles')}
        >
          Miles
        </Button>
        <Button
          variant="contained"
          color={updateButtonColor('gas')}
          size="medium"
          onClick={() => updateSelection('gas')}
        >
          Gas
        </Button>
        <Button
          variant="contained"
          color={updateButtonColor('trees')}
          size="medium"
          onClick={() => updateSelection('trees')}
        >
          Trees
        </Button>
      </CardActions>
    </Card>
  )
}

type CarbonComparisonCardProps = {
  data: EstimationResult[]
}
