from flask import Flask,redirect, render_template, request
import os
import swat

app = Flask(__name__)


@app.route("/")
def index():
  return render_template('fm.html',domain='http://magnus.unx.sas.com')

@app.route('/score',methods=['POST'])
def score():
  # Create the CAS Connection
	conn = swat.CAS('http://magnus.unx.sas.com:8777', protocol='http', username='saciar', password='X')

	# read the posted values from the UI
	_iCLAGE = request.form['MonthsCustomer']
	_iCLNO = request.form['NoLinesCredit']
	_iDEBTINC = request.form['DebtToIncomeRatio']
	_iDELINQ = request.form['NoDelinquentLinesCredit']
	_iDEROG = request.form['NoDerogatoryReports']
	_iJOB = request.form['Job']
	_iMORTDUE = request.form['MortgageDue']
	_iNINQ = request.form['NoRecentLinesCredit']
	_iREASON = request.form['Reason']
	_iVALUE = request.form['HomeValue']
	_iYOJ = request.form['YearsatJob']
	_iLOAN = request.form['LoanSize']
	# Create our inputs table
	conn.datastep.runcode('''
    		data PUBLIC.HMEQ;
        		CLAGE = ''' + _iCLAGE + ''';
        		CLNO = ''' + _iCLNO + ''';
        		DEBTINC = ''' + _iDEBTINC + ''';
        		DELINQ = ''' + _iDELINQ + ''';
        		DEROG = ''' + _iDEROG + ''';
        		JOB = "''' +  _iJOB + '''";
        		MORTDUE = ''' + _iMORTDUE + ''';
                LOAN = '''+ _iLOAN + ''';
        		NINQ = ''' + _iNINQ + ''';
        		REASON = "''' + _iREASON + '''";
        		VALUE = ''' + _iVALUE + ''';
        		YOJ = ''' + _iYOJ + ''';
    		run; ''')

	# Score new inputs using model saved in CAS
	conn.loadactionset(actionset="modelPublishing")
	conn.modelPublishing.runModelLocal(
    		inTable = {"caslib": "PUBLIC", "name": "HMEQ"},
   		modelName = "HMEQ_GB",
    		modelTable = {"caslib": "PUBLIC", "name": "SAS_MODEL_TABLE"},
    		outTable = {"caslib": "PUBLIC", "name": "hmeq_site_score"}
)

	# Getting outputs
	t=conn.CASTable('hmeq_site_score', caslib='PUBLIC')
	t = t.to_frame()
	t = t.P_BAD1
	t = t[0]
	t=round(t, 3)
	t = t*100
	t = str(t)
	output = "There is a " + t + "% chance this individual will default on their loan."
	return(output)
